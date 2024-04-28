'use strict';

var utils = require('../utils/writer.js');
var TiposDeTrabajo = require('../service/TiposDeTrabajoService');

module.exports.tipos_trabajoGET = function tipos_trabajoGET (req, res, next) {
  TiposDeTrabajo.tipos_trabajoGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tipos_trabajoIdDELETE = function tipos_trabajoIdDELETE (req, res, next, id) {
  TiposDeTrabajo.tipos_trabajoIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tipos_trabajoIdGET = function tipos_trabajoIdGET (req, res, next, id) {
  TiposDeTrabajo.tipos_trabajoIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tipos_trabajoIdPUT = function tipos_trabajoIdPUT (req, res, next, body, id) {
  TiposDeTrabajo.tipos_trabajoIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.tipos_trabajoPOST = function tipos_trabajoPOST (req, res, next, body) {
  TiposDeTrabajo.tipos_trabajoPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
