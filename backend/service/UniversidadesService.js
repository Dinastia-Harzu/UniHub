'use strict';


/**
 * GET Universidades
 *
 * returns OK-GET
 **/
exports.universidadesGET = function() {
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
 * GET Universidad
 *
 * id Integer el identificador del trabajo
 * returns OK-GETidPUT
 **/
exports.universidadesIdGET = function(id) {
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

