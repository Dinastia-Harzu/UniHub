'use strict';


/**
 * GET Ficheros multimedia
 *
 * returns OK-GET
 **/
exports.multimediaGET = function() {
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
 * DELETE Multimedia
 *
 * returns NoContent
 **/
exports.multimediaIdDELETE = function() {
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
 * GET Fichero multimedia
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.multimediaIdGET = function(id) {
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
 * PUT Multimedia
 *
 * returns OK-GETidPUT
 **/
exports.multimediaIdPUT = function() {
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
 * POST Multimedia
 *
 * returns Created
 **/
exports.multimediaPOST = function() {
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

