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

module.exports.multimediaIdDELETE = function multimediaIdDELETE (req, res, next, id) {
  Multimedia.multimediaIdDELETE(id)
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

module.exports.multimediaIdPUT = function multimediaIdPUT (req, res, next, body, id) {
  Multimedia.multimediaIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.multimediaPOST = function multimediaPOST (req, res, next, body) {
  Multimedia.multimediaPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
