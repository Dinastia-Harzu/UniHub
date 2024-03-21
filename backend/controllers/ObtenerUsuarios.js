'use strict';

var utils = require('../utils/writer.js');
var ObtenerUsuarios = require('../service/ObtenerUsuariosService');

module.exports.usuariosGET = function usuariosGET (req, res, next, nombreEntradaHolaMundo) {
  ObtenerUsuarios.usuariosGET(nombreEntradaHolaMundo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
