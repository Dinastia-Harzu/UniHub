"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./PalabrasClaveService");

/**
 * GET Palabras clave
 *
 * returns OK-GET
 **/
exports.palabras_claveGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM \`palabra-clave\``, (err, filas) => {
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
 * DELETE Palabra clave
 *
 * id Integer el identificador de la palabra clave
 * returns NoContent
 **/
exports.palabras_claveIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.palabras_claveIdGET(id).then(
      (res) => {
        conexion.query(
          `DELETE FROM \`palabra-clave\` WHERE id = ${id}`,
          (err) => {
            if (err) {
              console.error(err);
              reject(responder(500, respuestas[500]));
            } else {
              resolve(responder(200, respuestas[204]));
            }
          }
        );
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
 * GET Palabra clave
 *
 * id Integer el identificador de la palabra clave
 * returns OK-GETidPUT
 **/
exports.palabras_claveIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `SELECT * FROM \`palabra-clave\` WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          console.error(err);
          reject(responder(500, respuestas[500]));
        } else if (res.length == 0) {
          reject(responder(204));
        } else {
          resolve(responder(200, res[0]));
        }
      }
    );
  });
};

/**
 * PUT Palabra clave
 *
 * body ReqPalabraClave
 * id Integer el identificador de la palabra clave
 * returns OK-GETidPUT
 **/
exports.palabras_claveIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.palabras_claveIdGET(id).then(
      (res) => {
        conexion.query(camposPut("palabra-clave", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.palabras_claveIdGET(id).then(
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
 * POST PalabrasClave
 *
 * body ReqPalabraClave
 * returns Created
 **/
exports.palabras_clavePOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO \`palabra-clave\` VALUES (
        ${$()},
        ${$(body.nombre)}
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
          return _.palabras_claveGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    "palabra-clave": res.payload.at(-1),
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
