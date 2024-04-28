"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./MultimediaService");

/**
 * GET Ficheros multimedia
 *
 * returns OK-GET
 **/
exports.multimediaGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM multimedia`, (err, filas) => {
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
 * DELETE Multimedia
 *
 * id Integer el identificador del archivo multimedia
 * returns NoContent
 **/
exports.multimediaIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.multimediaIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM multimedia WHERE id = ${id}`, (err) => {
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
 * GET Fichero multimedia
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.multimediaIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM multimedia WHERE id = ${id}`, (err, res) => {
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
 * PUT Multimedia
 *
 * body ReqMultimedia
 * id Integer el identificador del archivo multimedia
 * returns OK-GETidPUT
 **/
exports.multimediaIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.multimediaIdGET(id).then(
      (res) => {
        conexion.query(camposPut("multimedia", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.multimediaIdGET(id).then(
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
 * POST Multimedia
 *
 * body ReqMultimedia
 * returns Created
 **/
exports.multimediaPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO multimedia VALUES (
        ${$()},
        ${$(body.nombre)},
        ${$(body.ruta)},
        ${$(body.trabajo)}
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
          _.multimediaGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    multimedia: res.payload.at(-1),
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
