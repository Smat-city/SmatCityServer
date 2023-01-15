"use strict";
exports.__esModule = true;
exports.signToken = exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var configs_1 = require("../configs");
var verifyToken = function (token, options) {
    try {
        var payload = (0, jsonwebtoken_1.verify)(token, configs_1.globals.JWT_SECRET, options);
        return {
            payload: payload,
            err: null
        };
    }
    catch (err) {
        return {
            payload: null,
            err: err
        };
    }
};
exports.verifyToken = verifyToken;
var signToken = function (payload, options) {
    try {
        var token = (0, jsonwebtoken_1.sign)(payload, configs_1.globals.JWT_SECRET, options);
        return {
            token: token,
            err: null
        };
    }
    catch (err) {
        return {
            err: err
        };
    }
};
exports.signToken = signToken;
