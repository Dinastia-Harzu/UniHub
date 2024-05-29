"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const camposPut = helper.determinarCamposPut;
const $ = helper.json2sql;
const filtro = helper.filtro;
const select = helper.select;
const _ = require("./TrabajosService");
const palabrasClave = require("./PalabrasClaveService");

function construirConsulta(params) {
  let sql = `
    SELECT t.*, u.nombre AS nombre_autor, tt.nombre AS nombre_tipotrabajo, tl.nombre AS nombre_titulacion
    FROM trabajo t
    JOIN usuario u ON u.id = t.autor
    JOIN \`tipo-trabajo\` tt ON tt.id = t.\`tipo\`
    JOIN titulacion tl ON tl.id = t.titulacion
    WHERE 1 = 1
    `;

  let condiciones = [];
  let valores = [];

  if (params.nombre) {
    condiciones.push("t.nombre LIKE ?");
    valores.push(`%${params.nombre}%`);
  }
  if (params.autor) {
    condiciones.push("CONCAT(u.nombre, ' ', u.apellidos) LIKE ?");
    valores.push(`%${params.autor}%`);
  }
  if (params.autorId) {
    condiciones.push("u.id = ?");
    valores.push(params.autorId);
  }
  if (params.publicacion) {
    condiciones.push("DATE(t.publicacion) = STR_TO_DATE(?, '%Y-%m-%d')");
    valores.push(params.publicacion);
  }
  if (params["tipo-trabajo"] && params["tipo-trabajo"] != "-1") {
    condiciones.push("tt.id = ?");
    valores.push(params["tipo-trabajo"]);
  }
  if (params.titulacion && params.titulacion != "-1") {
    condiciones.push("tl.id = ?");
    valores.push(params.titulacion);
  }
  if (params["palabras-clave"]) {
    const palabras_clave = params["palabras-clave"].split("_");
    condiciones.push(
      "(" +
        palabras_clave.map(() => "t.`palabras-clave` LIKE ?").join(" OR ") +
        ")"
    );
    valores.push(...palabras_clave.map((palabra) => `%${palabra}%`));
  }
  if (condiciones.length > 0) {
    sql += "AND " + condiciones.join(" AND ");
  }

  return { sql, valores };
}

/**
 * GET Trabajos
 *
 * returns OK-GET
 **/
exports.trabajosGET = function (params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    const { sql, valores } = construirConsulta(params);
    conexion.query(sql, valores, (err, filas) => {
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
        conexion.query(`DELETE FROM trabajo WHERE id = ${id} `, (err) => {
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
    conexion.query(
      `
        SELECT
          t.*,
          u.nombre AS \`nombre-autor\`,
          u.apellidos AS \`apellidos-autor\`,
          tl.nombre AS \`nombre-titulacion\`,
          tt.nombre AS \`nombre-tipo-trabajo\`
        FROM trabajo t
        JOIN usuario u ON(u.id = t.autor)
        JOIN titulacion tl ON(tl.id = t.titulacion)
        JOIN \`tipo-trabajo\` tt ON(tt.id = t.tipo)
        WHERE t.id = ${id}
      `,
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
      `
        INSERT INTO trabajo VALUES (
          ${$()},
          ${$(body.nombre)},
          ${$(body.tipo)},
          ${$(body.autor)},
          ${$(body.titulacion)},
          ${$(body.publicacion)},
          ${$(body.resumen)},
          ${$(body.portada.ruta)},
          ${$(body.documento.ruta)}
        );`,
      (err, res) => {
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
          const id_trabajo = res.insertId;
          console.log(body);
          const inserciones_multimedia = body.multimedia.map((multimedia) => {
            return new Promise((resolve, reject) => {
              conexion.query(
                `
                INSERT INTO multimedia VALUES(
                  ${$()},
                  ${$(multimedia.nombre)},
                  ${$(multimedia.ruta)},
                  ${$(id_trabajo)}
                )
              `,
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            });
          });
          const inserciones_palabras_clave = body["palabras-clave"].map(
            (nombre) => {
              return new Promise((resolve, reject) => {
                conexion.query(
                  `
                INSERT INTO \`palabra-clave\` VALUES(${$()}, ${$(nombre)})
              `,
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  }
                );
              });
            }
          );
          Promise.all(inserciones_multimedia)
            .then(() => {
              return Promise.all(inserciones_palabras_clave);
            })
            .then((resultados) => {
              const inserciones_palabras_clave_trabajos = resultados.map(
                (resultado) => {
                  return new Promise((resolve, reject) => {
                    conexion.query(
                      `
                    INSERT INTO \`palabra-clave-trabajo\` VALUES(
                      ${$(id_trabajo)},
                      ${$(resultado.insertId)}
                    );
                  `,
                      (err, result) => {
                        if (err) {
                          return reject(err);
                        }
                        resolve(result);
                      }
                    );
                  });
                }
              );
              return Promise.all(inserciones_palabras_clave_trabajos);
            })
            .then(() => {
              conexion.commit((err) => {
                if (err) {
                  return conexion.rollback(() => {
                    reject(err);
                  });
                }
                resolve(
                  responder(
                    201,
                    Object.assign({}, respuestas[201], { trabajo: id_trabajo })
                  )
                );
              });
            })
            .catch((err) => {
              conexion.rollback(() => {
                reject(err);
              });
            });
        }
      }
    );
  });
};

function subirFicherosTrabajo(req, res) {
  console.log(req);
  console.log(res);
  helper.guardarFicheroNube.fields([
    { name: "portada", maxCount: 1 },
    { name: "documento", maxCount: 1 },
    { name: "multimedia" },
  ])(req, res, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
