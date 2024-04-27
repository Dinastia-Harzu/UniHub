"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;

/**
 * GET Usuarios
 *
 * returns OK-GET
 **/
exports.usuariosGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `
      SELECT *
      FROM usuario
    ;`,
      (err, filas) => {
        if (err) {
          console.log(err);
          reject(responder(500, respuestas[500]));
        } else if (filas.length == 0) {
          reject(responder(404, respuestas[404]));
        } else {
          resolve(responder(200, filas));
        }
      }
    );
  });
};

/**
 * DELETE Usuario
 *
 * returns NoContent
 **/
exports.usuariosIdDELETE = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      204: "Se ha borrado el recurso correctamente.",
    };
    if (Object.keys(examples).length > 0) {
      resolve(responder(404, examples[Object.keys(examples)[0]]));
    } else {
      reject();
    }
  });
};

/**
 * GET usuario
 *
 * id Integer el identificador del usuario
 * returns OK-GETidPUT
 **/
exports.usuariosIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      etc: "etc",
      id: 0,
      nombre: "nombre",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
};

/**
 * PUT Usuario
 *
 * returns OK-GETidPUT
 **/
exports.usuariosIdPUT = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {
      etc: "etc",
      id: 0,
      nombre: "nombre",
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      reject();
    }
  });
};

/**
 * POST Usuarios
 *
 * returns Created
 **/
exports.usuariosPOST = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `
      INSERT INTO usuario
      VALUES (
        NULL,
        ${req.nombre},
        ${req.correo},
        ${req.clave},
        ${req.titulacion},
        ${req.direccion},
        ${req.nacimiento},
        ${req.tema},
        ${req["foto-perfil"]},
      )
    `,
      (err) => {
        if (err) {
          console.log(err);
          reject(500, respuestas[500]);
        } else {
          resolve(responder(200, respuestas[200]));
        }
      }
    );
  });
};
