"use strict";

var utils = require("../utils/writer.js");
var Login = require("../service/LoginService");

module.exports.loginPOST = function loginPOST(req, res, next, body) {
  Login.loginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
