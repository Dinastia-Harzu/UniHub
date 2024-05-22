"use strict";

const express = require("express");
const mysql = require("mysql");
const app = express();
const bp = require("body-parser");
const cors = require("cors");
const moment = require("moment");
const jwt = require("jwt-simple");
const responder = require("./writer").respondWithCode;

const config = require("../config");

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
  host: config.huesped,
  user: config.usuario,
  password: config.clave,
  database: config.db,
  typeCast: function castField(field, useDefaultTypeCasting) {
    if (field.type === "BIT" && field.length === 1) {
      const bytes = field.buffer();
      return bytes[0] === 1;
    }
    return useDefaultTypeCasting();
  },
  multipleStatements: true
});

function getHttpCodeFromErrNo(errno) {
  if (errno) {
    switch (errno) {
      case "ER_PARSE_ERROR":
      case "ER_WRONG_VALUE_COUNT_ON_ROW":
      case "ER_DUP_ENTRY":
      case "ER_BAD_FIELD_ERROR":
      case "ER_BAD_NULL_ERROR":
        return 400;
      case "ER":
        return 401;
      case "ER":
        return 403;
      case "ER_NO_SUCH_TABLE":
        return 404;

      default:
        return 500;
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
    200: "Se ha borrado el recurso correctamente.",
  },
  400: {
    POST: { 400: "No se ha podido crear el recurso porque está mal formado." },
    PUT: {
      400: "No se ha podido modificar el recurso porque está mal formado.",
    },
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

function determinarCamposPut(tabla, cuerpo, id) {
  const len = Object.keys(cuerpo).length;
  let sql = `UPDATE ${tabla} SET `;
  if (len == 0) {
    sql += `id = ${id}`;
  } else {
    for (let i = 0; i < len; i++) {
      if (i > 0) {
        sql += ", ";
      }
      sql += `${Object.keys(cuerpo).at(i)} = ${json2sql(
        Object.values(cuerpo).at(i)
      )}`;
    }
  }
  sql += ` WHERE id = ${id}`;
  return sql;
}

function json2sql(valor) {
  if (typeof valor === "undefined" || typeof valor === "null") {
    return "NULL";
  }
  if (typeof valor === "string") {
    return `'${valor}'`;
  }
  return valor;
}

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
  determinarCamposPut,
  json2sql,
  SECRETO,
  TIEMPO_EXPIRACION_TOKEN,
  creaToken,
  decodificaToken,
};
