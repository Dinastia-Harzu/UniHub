'use strict';


/**
 * GET Titulaciones
 *
 * returns OK-GET
 **/
exports.titulacionesGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "recursos" : {
    "etc" : "etc",
    "id" : 0,
    "nombre" : "nombre"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * DELETE Titulacion
 *
 * returns NoContent
 **/
exports.titulacionesIdDELETE = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "204" : "Se ha borrado el recurso correctamente."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * GET Titulación
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.titulacionesIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "etc" : "etc",
  "id" : 0,
  "nombre" : "nombre"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * PUT Titulacion
 *
 * returns OK-GETidPUT
 **/
exports.titulacionesIdPUT = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "etc" : "etc",
  "id" : 0,
  "nombre" : "nombre"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * POST Titulaciones
 *
 * returns Created
 **/
exports.titulacionesPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "201" : "Se ha creado el recurso correctamente.",
  "recurso" : { }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

