"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./ComentariosService");

/**
 * GET Comentarios
 *
 * returns OK-GET
 **/
exports.comentariosGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM comentario`, (err, filas) => {
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
 * DELETE Comentario
 *
 * id Integer el identificador del comentario
 * returns NoContent
 **/
exports.comentariosIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.comentariosIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM comentario WHERE id = ${id}`, (err) => {
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
 * GET Comentario
 *
 * id Integer el identificador del comentario
 * returns OK-GETidPUT
 **/
exports.comentariosIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `SELECT * FROM comentario WHERE id = ${id}`,
      (err, filas) => {
        if (err) {
          console.error(err);
          reject(responder(500, respuestas[500]));
        } else {
          resolve(responder(200, filas));
        }
      }
    );
  });
};

/**
 * GET Comentarios de un trabajo
 *
 * id Integer el identificador del trabajo asociado
 * returns OK-GETidPUT
 **/
exports.comentarios_trabajoGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `SELECT * FROM comentario WHERE trabajo = ${id}`,
      (err, filas) => {
        if (err) {
          console.error(err);
          reject(responder(500, respuestas[500]));
        } else {
          resolve(responder(200, filas));
        }
      }
    );
  });
};

/**
 * PUT Comentario
 *
 * body ReqComentario
 * id Integer el identificador del comentario
 * returns OK-GETidPUT
 **/
exports.comentariosIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.comentariosIdGET(id).then(
      (res) => {
        conexion.query(camposPut("comentario", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.comentariosIdGET(id).then(
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
 * POST Comentarios
 *
 * body ReqComentario
 * returns Created
 **/
exports.comentariosPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO comentario VALUES (
        ${$()},
        ${$(body.autor)},
        ${$(body.trabajo)},
        ${$(body.comentario)},
        ${$(body.valoracion)}
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
          _.comentariosGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    comentario: res.payload.at(-1),
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
