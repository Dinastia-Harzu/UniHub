"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./UsuariosService");

/**
 * GET Usuarios
 *
 * returns OK-GET
 **/
exports.usuariosGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM usuario`, (err, filas) => {
      if (err) {
        console.error(err);
        reject(responder(500, respuestas[500]));
      } else {
        resolve(responder(200, filas));
      }
    });
  });
};

/**
 * DELETE Usuario
 *
 * id Integer el identificador del usuario
 * returns NoContent
 **/
exports.usuariosIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.usuariosIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM usuario WHERE id = ${id}`, (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            resolve(responder(200, respuestas[204]));
          }
        });
      },
      (err) => {
        if (err.code == 204) {
          reject(responder(404, respuestas[404]));
        } else {
          reject(err);
        }
      }
    );
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
    conexion.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.error(err);
        reject(responder(500, respuestas[500]));
      } else if (res.length == 0) {
        reject(responder(204));
      } else {
        resolve(responder(200, res[0]));
      }
    });
  });
};

/**
 * PUT Usuario
 *
 * body ReqUsuario
 * id Integer el identificador del usuario
 * returns OK-GETidPUT
 **/
exports.usuariosIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.usuariosIdGET(id).then(
      (res) => {
        conexion.query(camposPut("usuario", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.usuariosIdGET(id).then(
              (res) => resolve(res),
              (err) => reject(err)
            );
          }
        });
      },
      (err) => {
        if (err.code == 204) {
          reject(responder(404, respuestas[404]));
        } else {
          reject(err);
        }
      }
    );
  });
};

/**
 * POST Usuarios
 *
 * body ReqUsuario
 * returns Created
 **/
exports.usuariosPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO usuario VALUES (
        ${$()},
        ${$(body.nombre)},
        ${$(body.apellidos)},
        ${$(body.correo)},
        ${$(body.clave)},
        ${$(body.titulacion)},
        ${$(body.direccion)},
        ${$(body.nacimiento)},
        ${$(body.tema)},
        ${$(body["foto-perfil"])}
    )`,
      (err) => {
        if (err) {
          console.error(err);
          const codigo = helper.getHttpCodeFromErrNo(err.code);
          reject(
            responder(
              codigo,
              codigo == 400 ? respuestas[400].POST : respuestas[codigo]
            )
          );
        } else {
          _.usuariosGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    usuario: res.payload.at(-1),
                  })
                )
              ),
            (err) => reject(err)
          );
        }
      }
    );
  });
};
