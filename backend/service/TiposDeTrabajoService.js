'use strict';


/**
 * GET Tipos de trabajo
 *
 * returns OK-GET
 **/
exports.tipos_trabajoGET = function() {
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
 * DELETE Tipo de trabajo
 *
 * returns NoContent
 **/
exports.tipos_trabajoIdDELETE = function() {
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
 * GET Tipo de trabajo
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.tipos_trabajoIdGET = function(id) {
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
 * PUT Tipo de trabajo
 *
 * returns OK-GETidPUT
 **/
exports.tipos_trabajoIdPUT = function() {
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
 * POST Tipos de trabajo
 *
 * returns Created
 **/
exports.tipos_trabajoPOST = function() {
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

