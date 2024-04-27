'use strict';

var utils = require('../utils/writer.js');
var Titulaciones = require('../service/TitulacionesService');

module.exports.titulacionesGET = function titulacionesGET (req, res, next) {
  Titulaciones.titulacionesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.titulacionesIdDELETE = function titulacionesIdDELETE (req, res, next) {
  Titulaciones.titulacionesIdDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.titulacionesIdGET = function titulacionesIdGET (req, res, next, id) {
  Titulaciones.titulacionesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.titulacionesIdPUT = function titulacionesIdPUT (req, res, next) {
  Titulaciones.titulacionesIdPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.titulacionesPOST = function titulacionesPOST (req, res, next) {
  Titulaciones.titulacionesPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
