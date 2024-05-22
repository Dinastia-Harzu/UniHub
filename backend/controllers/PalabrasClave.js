"use strict";

var utils = require("../utils/writer.js");
var PalabrasClave = require("../service/PalabrasClaveService");

module.exports.palabras_claveGET = function palabras_claveGET(req, res, next) {
  PalabrasClave.palabras_claveGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.palabras_claveIdDELETE = function palabras_claveIdDELETE(
  req,
  res,
  next,
  id
) {
  PalabrasClave.palabras_claveIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.palabras_claveIdGET = function palabras_claveIdGET(
  req,
  res,
  next,
  id
) {
  PalabrasClave.palabras_claveIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.palabras_claveIdPUT = function palabras_claveIdPUT(
  req,
  res,
  next,
  body,
  id
) {
  PalabrasClave.palabras_claveIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.palabras_clavePOST = function palabras_clavePOST(
  req,
  res,
  next,
  body
) {
  PalabrasClave.palabras_clavePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
