"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const _ = require("./TiposDeTrabajoService");

/**
 * GET Tipos de trabajo
 *
 * returns OK-GET
 **/
exports.tipos_trabajoGET = function () {
  return new Promise(function (resolve, reject) {
    conexion.query(`SELECT * FROM \`tipo-trabajo\``, (err, filas) => {
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
 * DELETE Tipo de trabajo
 *
 * id Integer el identificador del tipo de trabajo
 * returns NoContent
 **/
exports.tipos_trabajoIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    _.tipos_trabajoIdGET(id).then(
      (res) => {
        conexion.query(`DELETE FROM tipo-trabajo WHERE id = ${id}`, (err) => {
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
 * GET Tipo de trabajo
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.tipos_trabajoIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `SELECT * FROM \`tipo-trabajo\` WHERE id = ${id}`,
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
 * PUT Tipo de trabajo
 *
 * body ReqTipoTrabajo
 * id Integer el identificador del tipo de trabajo
 * returns OK-GETidPUT
 **/
exports.tipos_trabajoIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    _.tipos_trabajoIdGET(id).then(
      (res) => {
        conexion.query(camposPut("tipo-trabajo", body, id), (err) => {
          if (err) {
            console.error(err);
            reject(responder(500, respuestas[500]));
          } else {
            _.tipos_trabajoIdGET(id).then(
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
 * POST Tipos de trabajo
 *
 * body ReqTipoTrabajo
 * returns Created
 **/
exports.tipos_trabajoPOST = function (body) {
  return new Promise(function (resolve, reject) {
    conexion.query(
      `INSERT INTO \`tipo-trabajo\` VALUES (
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
          _.tipos_trabajoGET().then(
            (res) =>
              resolve(
                responder(
                  201,
                  Object.assign({}, respuestas[201], {
                    "tipo-trabajo": res.payload.at(-1),
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
