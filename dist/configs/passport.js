"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = exports.passport = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var passport_1 = require("passport");
var passport_jwt_1 = require("passport-jwt");
var globals_1 = __importDefault(require("./globals"));
var verify = function (req, payload, done) {
    if (req.url === "/refresh") {
        return done(null, payload);
    }
    if (Date.now() > payload.exp * 1000) {
        return done(new jsonwebtoken_1.TokenExpiredError("Token is no longer valid", new Date(payload.exp)), undefined);
    }
    done(null, payload);
};
exports.passport = new passport_1.Passport();
exports.strategy = new passport_jwt_1.Strategy({
    ignoreExpiration: true,
    secretOrKey: globals_1.default.JWT_SECRET,
    passReqToCallback: true,
    jwtFromRequest: function (req) {
        return req.cookies[globals_1.default.ACCESS_TOKEN_KEY];
    },
}, verify);
//# sourceMappingURL=passport.js.map