"use strict";

var utils = require("../utils/writer.js");
var Comentarios = require("../service/ComentariosService");

module.exports.comentariosGET = function comentariosGET(req, res, next) {
  Comentarios.comentariosGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comentariosIdDELETE = function comentariosIdDELETE(
  req,
  res,
  next,
  id
) {
  Comentarios.comentariosIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comentariosIdGET = function comentariosIdGET(
  req,
  res,
  next,
  id
) {
  Comentarios.comentariosIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comentarios_trabajoGET = function comentarios_trabajoGET(
  req,
  res,
  next,
  id
) {
  Comentarios.comentarios_trabajoGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comentariosIdPUT = function comentariosIdPUT(
  req,
  res,
  next,
  body,
  id
) {
  Comentarios.comentariosIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comentariosPOST = function comentariosPOST(
  req,
  res,
  next,
  body
) {
  Comentarios.comentariosPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
