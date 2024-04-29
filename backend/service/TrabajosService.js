"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./TrabajosService");

/**
 * GET Trabajos
 *
 * returns OK-GET
 **/
exports.trabajosGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM trabajo`, (err, filas) => {
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
 * DELETE Trabajo
 *
 * id Integer el identificador del trabajo
 * returns NoContent
 **/
exports.trabajosIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.trabajosIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM trabajo WHERE id = ${id}`, (err) => {
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
 * GET Trabajo
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.trabajosIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM trabajo WHERE id = ${id}`, (err, res) => {
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
 * PUT Trabajo
 *
 * body ReqTrabajo
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.trabajosIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.trabajosIdGET(id).then(
      (res) => {
        conexion.query(camposPut("trabajo", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.trabajosIdGET(id).then(
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
 * POST Trabajos
 *
 * body ReqTrabajo
 * returns Created
 **/
exports.trabajosPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO trabajo VALUES (
        ${$()},
        ${$(body.tipo)},
        ${$(body.autor)},
        ${$(body.titulacion)},
        ${$(body.publicacion)},
        ${$(body.resumen)},
        ${$(body.portada)},
        ${$(body.documento)}
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
          _.trabajosGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    trabajo: res.payload.at(-1),
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
