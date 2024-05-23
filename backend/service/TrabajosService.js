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

/**
 * GET Trabajos
 *
 * returns OK-GET
 **/
const buildQuery = (params) => {
  let query = `
    SELECT t.*, u.nombre AS nombre_autor, tt.nombre AS nombre_tipotrabajo, tl.nombre AS nombre_titulacion
    FROM trabajo t
    JOIN usuario u ON u.id = t.autor
    JOIN \`tipo-trabajo\` tt ON tt.id = t.\`tipo\`
    JOIN titulacion tl ON tl.id = t.titulacion
    WHERE 1 = 1
    `;

  let conditions = [];
  let values = [];

  if (params.nombre) {
    conditions.push("t.nombre LIKE ?");
    values.push(`% ${params.nombre}% `);
  }
  if (params.autor) {
    conditions.push("u.nombre LIKE ?");
    values.push(`% ${params.autor}% `);
  }
  if (params.autorId) {
    conditions.push("u.id = ?");
    values.push(params.autorId);
  }
  if (params.fecha) {
    conditions.push("t.fecha = ?");
    values.push(params.fecha);
  }
  if (params["tipo-trabajo"] && params["tipo-trabajo"] != "-1") {
    conditions.push("tt.id = ?");
    values.push(params["tipo-trabajo"]);
  }
  if (params.titulacion && params.titulacion != "-1") {
    conditions.push("tl.id = ?");
    values.push(params.titulacion);
  }
  if (params["palabras-clave"]) {
    const palabras_clave = params["palabras-clave"].split('_');
    conditions.push("(" + palabras_clave.map(() => "t.`palabras-clave` LIKE ?").join(" OR ") + ")");
    values.push(...palabras_clave.map(palabra => `% ${palabra}% `));
  }
  if (conditions.length > 0) {
    query += " AND " + conditions.join(" AND ");
  }

  return { query, values };
};

exports.trabajosGET = function (params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    const { query, values } = buildQuery(params);

    conexion.query(query, values, (err, filas) => {
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
    conexion.query(`SELECT * FROM trabajo WHERE id = ${id} `, (err, res) => {
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
    // // Insertar en la tabla TRABAJO
    // const trabajoQuery = 'INSERT INTO TRABAJO (column1, column2, ...) VALUES (?, ?, ...)';
    // connection.query(trabajoQuery, [trabajoData.column1, trabajoData.column2, ...], (err, result) => {
    //   if (err) {
    //     return connection.rollback(() => {
    //       callback(err);
    //     });
    //   }

    //   const idTrabajo = result.insertId;

    //   // Insertar en la tabla MULTIMEDIA
    //   const multimediaQueries = multimediaFiles.map(ruta => {
    //     return new Promise((resolve, reject) => {
    //       const multimediaQuery = 'INSERT INTO MULTIMEDIA (ruta, trabajo) VALUES (?, ?)';
    //       connection.query(multimediaQuery, [ruta, idTrabajo], (err, result) => {
    //         if (err) return reject(err);
    //         resolve(result);
    //       });
    //     });
    //   });

    //   // Insertar en la tabla PALABRA-CLAVE y obtener sus IDs
    //   const palabraClaveQueries = keywords.map(palabra => {
    //     return new Promise((resolve, reject) => {
    //       const palabraClaveQuery = 'INSERT INTO PALABRA_CLAVE (palabra) VALUES (?)';
    //       connection.query(palabraClaveQuery, [palabra], (err, result) => {
    //         if (err) return reject(err);
    //         resolve(result.insertId);
    //       });
    //     });
    //   });

    //   Promise.all(multimediaQueries)
    //     .then(() => {
    //       return Promise.all(palabraClaveQueries);
    //     })
    //     .then(palabraClaveIds => {
    //       // Insertar en la tabla PALABRA_CLAVE_TRABAJO
    //       const palabraClaveTrabajoQueries = palabraClaveIds.map(idPalabraClave => {
    //         return new Promise((resolve, reject) => {
    //           const palabraClaveTrabajoQuery = 'INSERT INTO PALABRA_CLAVE_TRABAJO (id_palabra_clave, id_trabajo) VALUES (?, ?)';
    //           connection.query(palabraClaveTrabajoQuery, [idPalabraClave, idTrabajo], (err, result) => {
    //             if (err) return reject(err);
    //             resolve(result);
    //           });
    //         });
    //       });

    //       return Promise.all(palabraClaveTrabajoQueries);
    //     })
    //     .then(() => {
    //       connection.commit(err => {
    //         if (err) {
    //           return connection.rollback(() => {
    //             callback(err);
    //           });
    //         }
    //         callback(null, { idTrabajo });
    //       });
    //     })
    //     .catch(err => {
    //       connection.rollback(() => {
    //         callback(err);
    //       });
    //     });

    conexion.query(
      //   `
      //   START TRANSACTION;
      //   INSERT INTO trabajo VALUES (
      //     ${$()},
      //     ${$(body.nombre)},
      //     ${$(body.tipo)},
      //     ${$(body.autor)},
      //     ${$(body.titulacion)},
      //     ${$(body.publicacion)},
      //     ${$(body.resumen)},
      //     ${$(body.portada)},
      //     ${$(body.documento)}
      // );
      // SET @id_trabajo = LAST_INSERT_ID();
      // INSERT INTO \`palabra-clave\` VALUES(${$()}, ${$(palabra)});
      // SET @id_palabra_clave = LAST_INSERT_ID();
      // INSERT INTO \`palabra-clave-trabajo\` VALUES(@id_trabajo, @id_palabra_clave);
      // COMMIT;
      // `
      `
        INSERT INTO trabajo VALUES (
          ${$()},
          ${$(body.nombre)},
          ${$(body.tipo)},
          ${$(body.autor)},
          ${$(body.titulacion)},
          ${$(body.publicacion)},
          ${$(body.resumen)},
          ${$(body.portada)},
          ${$(body.documento)}
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
          // let promesas = [];
          // _.trabajosGET().then(
          //   res => {
          //     const trabajo = res.payload.at(-1);
          //     for (const palabra of body["palabras-clave"]) {
          //       promesas.push(palabrasClave.palabras_clavePOST({ nombre: palabra })
          //         .then(r => new Promise((resolve0, reject0) => {
          //           conexion.query(`
          //           INSERT INTO \`palabra-clave-trabajo\` VALUES(
          //             ${trabajo.id},
          //             ${r.payload["palabra-clave"].id}
          //           )
          //         `, err => {
          //             if (err) {
          //               console.error(err);
          //               reject(err);
          //             } else {
          //               resolve(responder(201, Object.assign({}, respuestas[201])));
          //             }
          //           });
          //         }), e => { console.error(e); reject(e) }));
          //     }
          //     return Promise.all(promesas);
          //   }, error => reject(error)
          // ).then(res => {
          //   resolve(
          //     responder(
          //       201,
          //       Object.assign({}, respuestas[201], {
          //         trabajo: res.payload.at(-1),
          //       })
          //     )
          //   )
          // }, err => { console.error(err); reject(err) });

          // _.trabajosGET().then(
          //   (res) => {
          //     const trabajo = res.payload.at(-1);
          //     for (const palabra of body["palabras-clave"]) {
          //       const promesas = [];
          //       promesas.push(
          //         new Promise((resolve, reject) => {
          //           conexion.query(
          //             `

          //       `,
          //             (err) => {
          //               if (err) {
          //                 console.error(err);
          //                 reject(err);
          //               } else {
          //                 resolve(
          //                   responder(201, Object.assign({}, respuestas[201]))
          //                 );
          //               }
          //             }
          //           );
          //         })
          //       );
          //       Promise.all(promesas).then(
          //         () => {
          //           resolve(
          //             responder(
          //               201,
          //               Object.assign({}, respuestas[201], {
          //                 trabajo: Object.assign(trabajo, {
          //                   "palabras-clave": body["palabras-clave"],
          //                 }),
          //               })
          //             )
          //           );
          //         },
          //         (e) => {
          //           console.error(e);
          //           reject(e);
          //         }
          //       );
          //     }
          //   },
          //   (error) => {
          //     console.error(error);
          //     reject(error);
          //   }
          // );
        }
      }
    );
  });
};
