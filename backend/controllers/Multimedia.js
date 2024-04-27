'use strict';

var utils = require('../utils/writer.js');
var Multimedia = require('../service/MultimediaService');

module.exports.multimediaGET = function multimediaGET (req, res, next) {
  Multimedia.multimediaGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.multimediaIdDELETE = function multimediaIdDELETE (req, res, next) {
  Multimedia.multimediaIdDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.multimediaIdGET = function multimediaIdGET (req, res, next, id) {
  Multimedia.multimediaIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.multimediaIdPUT = function multimediaIdPUT (req, res, next) {
  Multimedia.multimediaIdPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.multimediaPOST = function multimediaPOST (req, res, next) {
  Multimedia.multimediaPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
