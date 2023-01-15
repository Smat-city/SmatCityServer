"use strict";
exports.__esModule = true;
exports.AuthLoginSchema = exports.AuthRegisterSchema = void 0;
var zod_1 = require("zod");
var utils_1 = require("../utils");
var transform = function (arg, trimOnly) {
    var trimmedString = arg.trim();
    return trimOnly
        ? trimmedString
        : "".concat(trimmedString[0].toUpperCase()).concat(trimmedString.slice(1));
};
exports.AuthRegisterSchema = (0, zod_1.object)({
    firstname: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Firstname")
    })
        .min(1, {
        message: utils_1.messages.NOTEMPTY("Firstname")
    })
        .transform(function (arg) { return transform(arg); }),
    lastname: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Lastname")
    })
        .min(1, {
        message: utils_1.messages.NOTEMPTY("Lastname")
    })
        .transform(function (arg) { return transform(arg); }),
    username: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Username")
    })
        .min(1, {
        message: utils_1.messages.NOTEMPTY("Username")
    })
        .max(25, {
        message: utils_1.messages.LIMIT("Username", undefined, 25)
    })
        .transform(function (arg) { return transform(arg, true); }),
    email: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Email")
    })
        .min(1, {
        message: utils_1.messages.NOTEMPTY("Email")
    })
        .email({
        message: utils_1.messages.EMAIL
    }),
    password: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Password")
    }).min(8, {
        message: utils_1.messages.LIMIT("Password", 8)
    })
});
exports.AuthLoginSchema = (0, zod_1.object)({
    username: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Username")
    }).min(1, {
        message: utils_1.messages.NOTEMPTY("Username")
    }),
    password: (0, zod_1.string)({
        required_error: utils_1.messages.REQUIRED("Password")
    }).min(1, {
        message: utils_1.messages.NOTEMPTY("Password")
    })
});
