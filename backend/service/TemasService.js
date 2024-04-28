"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./TemasService");

/**
 * GET Temas
 *
 * returns OK-GET
 **/
exports.temasGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM tema`, (err, filas) => {
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
 * DELETE Tema
 *
 * id Integer el identificador del tema
 * returns NoContent
 **/
exports.temasIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.temasIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM tema WHERE id = ${id}`, (err) => {
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
 * GET Tema
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.temasIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM tema WHERE id = ${id}`, (err, res) => {
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
 * PUT Tema
 *
 * body ReqTema
 * id Integer el identificador del tema
 * returns OK-GETidPUT
 **/
exports.temasIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.temasIdGET(id).then(
      (res) => {
        conexion.query(camposPut("tema", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.temasIdGET(id).then(
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
 * POST Temas
 *
 * body ReqTema
 * returns Created
 **/
exports.temasPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO tema VALUES (
        ${$()},
        ${$(body.nombre)},
        ${$(body.css)}
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
          _.temasGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    tema: res.payload.at(-1),
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
