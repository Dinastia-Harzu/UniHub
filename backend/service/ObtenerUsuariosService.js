'use strict';


/**
 * GET Usuarios
 *
 * nombreEntradaHolaMundo String nombre Entrada Hola Mundo
 * returns inline_response_200
 **/
exports.usuariosGET = function (nombreEntradaHolaMundo) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "usuarios": [{
        "id": "id",
        "nombre": "lol",
        "email": "email"
      }, {
        "id": "id",
        "nombre": "nombre",
        "email": "email"
      }]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

