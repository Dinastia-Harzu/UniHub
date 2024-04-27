'use strict';

var utils = require('../utils/writer.js');
var Usuarios = require('../service/UsuariosService');

module.exports.usuariosGET = function usuariosGET (req, res, next) {
  Usuarios.usuariosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosIdDELETE = function usuariosIdDELETE (req, res, next) {
  Usuarios.usuariosIdDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosIdGET = function usuariosIdGET (req, res, next, id) {
  Usuarios.usuariosIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosIdPUT = function usuariosIdPUT (req, res, next) {
  Usuarios.usuariosIdPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usuariosPOST = function usuariosPOST (req, res, next) {
  Usuarios.usuariosPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
