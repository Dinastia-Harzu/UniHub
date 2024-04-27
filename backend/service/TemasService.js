'use strict';


/**
 * GET Temas
 *
 * returns OK-GET
 **/
exports.temasGET = function() {
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
 * DELETE Tema
 *
 * returns NoContent
 **/
exports.temasIdDELETE = function() {
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
 * GET Tema
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.temasIdGET = function(id) {
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
 * PUT Tema
 *
 * returns OK-GETidPUT
 **/
exports.temasIdPUT = function() {
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
 * POST Temas
 *
 * returns Created
 **/
exports.temasPOST = function() {
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

