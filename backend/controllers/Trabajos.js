'use strict';

var utils = require('../utils/writer.js');
var Trabajos = require('../service/TrabajosService');

module.exports.trabajosGET = function trabajosGET (req, res, next) {
  Trabajos.trabajosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosIdDELETE = function trabajosIdDELETE (req, res, next) {
  Trabajos.trabajosIdDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosIdGET = function trabajosIdGET (req, res, next, id) {
  Trabajos.trabajosIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosIdPUT = function trabajosIdPUT (req, res, next) {
  Trabajos.trabajosIdPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.trabajosPOST = function trabajosPOST (req, res, next) {
  Trabajos.trabajosPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
