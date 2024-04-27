'use strict';

var utils = require('../utils/writer.js');
var Temas = require('../service/TemasService');

module.exports.temasGET = function temasGET (req, res, next) {
  Temas.temasGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.temasIdDELETE = function temasIdDELETE (req, res, next) {
  Temas.temasIdDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.temasIdGET = function temasIdGET (req, res, next, id) {
  Temas.temasIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.temasIdPUT = function temasIdPUT (req, res, next) {
  Temas.temasIdPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.temasPOST = function temasPOST (req, res, next) {
  Temas.temasPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
