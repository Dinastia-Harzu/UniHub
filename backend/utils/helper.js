"use strict";

const express = require("express");
const mysql = require("mysql");
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const jwt = require("jwt-simple");
const responder = require("./writer").respondWithCode;
app.use(cors());
app.options("*", cors());

app.use(bp.json());

const allowCrossTokenOrigin = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permiso a cualquier URL. Mejor acotar
  return next();
};
const allowCrossTokenMethods = (req, res, next) => {
  res.header("Access-Control-Allow-Methods", "*"); // Mejor acotar (GET, PUT, POST, DELETE)
  return next();
};
const allowCrossTokenHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "*"); // Mejor acotar (Content-type)
  return next();
};
app.use(allowCrossTokenOrigin);
app.use(allowCrossTokenMethods);
app.use(allowCrossTokenHeaders);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unihub",
  typeCast: function castField(field, useDefaultTypeCasting) {
    if (field.type === "BIT" && field.length === 1) {
      const bytes = field.buffer();
      return bytes[0] === 1;
    }
    return useDefaultTypeCasting();
  },
});

function getHttpCodeFromErrNo(errno) {
  if (errno) {
    switch (errno) {
      case -4078:
        return 500;
      default:
        return 400;
    }
  }
  return 500;
}

const respuestas = {
  200: {
    200: "Datos enviados correctamente.",
  },
  201: {
    201: "Se ha creado el recurso correctamente.",
  },
  204: {
    204: "Se ha borrado el recurso correctamente.",
  },
  400: {
    400: "No se ha podido crear el recurso porque está mal formado.",
  },
  401: {
    401: "Identifícate para acceder a este recurso.",
  },
  403: {
    403: "No estás autorizado para acceder a este recurso.",
  },
  404: {
    404: "No existe el recurso solicitado.",
  },
  500: {
    500: "Ha ocurrido un error interno en el servidor.",
  },
};

const SECRETO = "loremipsum";
const TIEMPO_EXPIRACION_TOKEN = 7 * 24 * 60;

function creaToken(usuario) {
  return jwt.encode(
    {
      sub: usuario.id,
      iat: moment().unix(),
      exp: moment().add(TIEMPO_EXPIRACION_TOKEN, "minutes").unix(),
    },
    SECRETO
  );
}

function decodificaToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, SECRETO, true);
      if (payload.exp <= moment().unix()) {
        reject(responder(401, { mensaje: "El token ha expirado" }));
      }
      connection.query(`
        SELECT *
        FROM usuario
        WHERE id = ${payload.sub}
      ;`);
      resolve(responder(200, { id: payload.sub }));
    } catch (err) {
      reject(responder(401, { mensaje: "El token no es válido" }));
    }
  });
}

module.exports = {
  connection,
  getHttpCodeFromErrNo,
  respuestas,
  SECRETO,
  TIEMPO_EXPIRACION_TOKEN,
  creaToken,
  decodificaToken,
};
