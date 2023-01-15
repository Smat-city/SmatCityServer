"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.authRouter = exports.accomodationsRouter = exports.usersRouter = void 0;
var users_1 = require("./users");
__createBinding(exports, users_1, "default", "usersRouter");
var accomodations_1 = require("./accomodations");
__createBinding(exports, accomodations_1, "default", "accomodationsRouter");
var auth_1 = require("./auth");
__createBinding(exports, auth_1, "default", "authRouter");
