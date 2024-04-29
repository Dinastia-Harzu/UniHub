'use strict';

var utils = require('../utils/writer.js');
var Universidades = require('../service/UniversidadesService');

module.exports.universidadesGET = function universidadesGET (req, res, next) {
  Universidades.universidadesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.universidadesIdGET = function universidadesIdGET (req, res, next, id) {
  Universidades.universidadesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
