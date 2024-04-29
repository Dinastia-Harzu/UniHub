"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./TitulacionesService");

/**
 * GET Titulaciones
 *
 * returns OK-GET
 **/
exports.titulacionesGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM titulacion`, (err, filas) => {
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
 * DELETE Titulacion
 *
 * id Integer el identificador de la titulación
 * returns NoContent
 **/
exports.titulacionesIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.titulacionesIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM titulacion WHERE id = ${id}`, (err) => {
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
 * GET Titulación
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.titulacionesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM titulacion WHERE id = ${id}`, (err, res) => {
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
 * PUT Titulacion
 *
 * body ReqTitulacion
 * id Integer el identificador de la titulación
 * returns OK-GETidPUT
 **/
exports.titulacionesIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.titulacionesIdGET(id).then(
      (res) => {
        conexion.query(camposPut("titulacion", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.titulacionesIdGET(id).then(
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
 * POST Titulaciones
 *
 * body ReqTitulacion
 * returns Created
 **/
exports.titulacionesPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO titulacion VALUES (
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
          _.titulacionesGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    titulacion: res.payload.at(-1),
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
