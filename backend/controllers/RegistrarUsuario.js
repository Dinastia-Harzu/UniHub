'use strict';

var utils = require('../utils/writer.js');
var RegistrarUsuario = require('../service/RegistrarUsuarioService');

module.exports.usuariosPOST = function usuariosPOST (req, res, next) {
  RegistrarUsuario.usuariosPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
