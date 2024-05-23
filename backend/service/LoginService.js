"use strict";

const writer = require("../utils/writer");
const responder = writer.respondWithCode;
const helper = require("../utils/helper");
const conexion = helper.connection;
const respuestas = helper.respuestas;
const $ = helper.json2sql;
const _ = require("./LoginService");

/**
 * POST Login
 *
 * body ReqLogin
 * returns Created
 **/
exports.loginPOST = function (body) {
    return new Promise(function (resolve, reject) {
        conexion.query(
            `SELECT * FROM usuario WHERE correo=${$(body.correo)} AND clave=${$(body.clave)}`,
            (err, filas) => {
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
                    if (filas.length == 0) {
                        reject(responder(403, { motivo: "No existe este usuario" }));
                        console.log(body.correo);
                    } else {
                       
                        
                        resolve(responder(200, filas[0])); 
                    }
                }
            }
        );
    });
};
