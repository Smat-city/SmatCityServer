"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRefresh = exports.user = exports.logout = exports.login = exports.register = void 0;
require("reflect-metadata");
var http_status_codes_1 = require("http-status-codes");
var tsyringe_1 = require("tsyringe");
var configs_1 = require("../configs");
var schema_1 = require("../schema");
var services_1 = require("../services");
var utils_1 = require("../utils");
var AuthRegisterSchema = schema_1.authSchema.AuthRegisterSchema, AuthLoginSchema = schema_1.authSchema.AuthLoginSchema;
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, validated, validationError, authService, userCreationError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (0, utils_1.schemaValidator)(AuthRegisterSchema, req.body), validated = _a.validated, validationError = _a.error;
                if (validationError || !validated)
                    return [2 /*return*/, next(validationError)];
                authService = tsyringe_1.container.resolve(services_1.AuthService);
                return [4 /*yield*/, authService.createUser(validated)];
            case 1:
                userCreationError = (_b.sent()).err;
                if (userCreationError) {
                    return [2 /*return*/, next(userCreationError)];
                }
                res.json({
                    success: true,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authService, _a, validated, validationError, _b, user, userVerificationError, _c, accessToken, accessTokenSignError, expiresAt, _d, refreshToken, refreshTokenGenerationError;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                authService = tsyringe_1.container.resolve(services_1.AuthService);
                _a = (0, utils_1.schemaValidator)(AuthLoginSchema, req.body), validated = _a.validated, validationError = _a.error;
                if (validationError || !validated)
                    return [2 /*return*/, next(validationError)];
                return [4 /*yield*/, authService.verifyUser(validated)];
            case 1:
                _b = _e.sent(), user = _b.user, userVerificationError = _b.err;
                if (userVerificationError) {
                    return [2 /*return*/, next(userVerificationError)];
                }
                if (user === null ||
                    utils_1.hashManager.compare(validated.password, user.password) === false) {
                    return [2 /*return*/, next(new utils_1.CustomError("Invalid username or password", configs_1.globals.CODE_INVALID_CREDENTIALS, http_status_codes_1.StatusCodes.UNAUTHORIZED))];
                }
                _c = utils_1.token.signToken({
                    id: user.id,
                    username: user.username,
                    type: user.type,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    verified: user.verified,
                    email: user.email,
                }, {
                    expiresIn: configs_1.globals.ACCESS_TOKEN_TTL,
                }), accessToken = _c.token, accessTokenSignError = _c.err;
                if (accessTokenSignError)
                    return [2 /*return*/, next(accessTokenSignError)];
                expiresAt = new Date(Date.now() + configs_1.globals.REFRESH_TOKEN_TTL);
                return [4 /*yield*/, authService.generateRefreshToken(user.id, expiresAt)];
            case 2:
                _d = _e.sent(), refreshToken = _d.refreshToken, refreshTokenGenerationError = _d.err;
                if (refreshTokenGenerationError)
                    return [2 /*return*/, next(refreshTokenGenerationError)];
                res
                    .cookie(configs_1.globals.ACCESS_TOKEN_KEY, accessToken, {
                    secure: configs_1.globals.NODE_ENV === "production",
                    httpOnly: true,
                })
                    .cookie(configs_1.globals.REFRESH_TOKEN_KEY, refreshToken, {
                    secure: configs_1.globals.NODE_ENV === "production",
                    httpOnly: true,
                })
                    .json({
                    success: true,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authService, id, cookies, refreshToken, _a, result, getRefreshTokenError, revokeRefreshTokenError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                authService = tsyringe_1.container.resolve(services_1.AuthService);
                id = req.user.id;
                cookies = req.cookies;
                refreshToken = cookies[configs_1.globals.REFRESH_TOKEN_KEY];
                return [4 /*yield*/, authService.getRefreshToken(refreshToken, id)];
            case 1:
                _a = _b.sent(), result = _a.result, getRefreshTokenError = _a.err;
                if (getRefreshTokenError)
                    return [2 /*return*/, next(getRefreshTokenError)];
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, authService.revokeRefreshToken(result.token)];
            case 2:
                revokeRefreshTokenError = (_b.sent()).err;
                if (revokeRefreshTokenError)
                    return [2 /*return*/, next(revokeRefreshTokenError)];
                res.clearCookie(configs_1.globals.REFRESH_TOKEN_KEY);
                _b.label = 3;
            case 3:
                res
                    .clearCookie(configs_1.globals.ACCESS_TOKEN_KEY)
                    .json({
                    success: true,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
var user = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload;
    return __generator(this, function (_a) {
        payload = req.user;
        res.json({
            success: true,
            payload: payload,
        });
        return [2 /*return*/];
    });
}); };
exports.user = user;
var tokenRefresh = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authService, cookies, _a, id, username, type, firstname, lastname, verified, email, refreshToken, authToken, _b, payload, tokenVerificationError, _c, result, getRefreshTokenError, revokeRefreshTokenError, _d, newAccessToken, accessTokenSignError, expiresAt, _e, newRefreshToken, refreshTokenGenerationError;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                authService = tsyringe_1.container.resolve(services_1.AuthService);
                cookies = req.cookies;
                _a = req.user, id = _a.id, username = _a.username, type = _a.type, firstname = _a.firstname, lastname = _a.lastname, verified = _a.verified, email = _a.email;
                refreshToken = cookies[configs_1.globals.REFRESH_TOKEN_KEY];
                authToken = cookies[configs_1.globals.ACCESS_TOKEN_KEY];
                _b = utils_1.token.verifyToken(authToken, {
                    ignoreExpiration: true,
                }), payload = _b.payload, tokenVerificationError = _b.err;
                if (tokenVerificationError)
                    return [2 /*return*/, next(tokenVerificationError)];
                if (Date.now() < (payload === null || payload === void 0 ? void 0 : payload.exp) * 1000) {
                    return [2 /*return*/, res.json({
                            success: true,
                        })];
                }
                return [4 /*yield*/, authService.getRefreshToken(refreshToken, id)];
            case 1:
                _c = _f.sent(), result = _c.result, getRefreshTokenError = _c.err;
                if (getRefreshTokenError)
                    return [2 /*return*/, next(getRefreshTokenError)];
                if (!result || new Date(Date.now()) > result.expiresAt) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                            success: false,
                        })];
                }
                return [4 /*yield*/, authService.revokeRefreshToken(result.token)];
            case 2:
                revokeRefreshTokenError = (_f.sent()).err;
                if (revokeRefreshTokenError)
                    return [2 /*return*/, next(revokeRefreshTokenError)];
                _d = utils_1.token.signToken({
                    id: id,
                    username: username,
                    type: type,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    verified: verified,
                }, {
                    expiresIn: configs_1.globals.ACCESS_TOKEN_TTL,
                }), newAccessToken = _d.token, accessTokenSignError = _d.err;
                if (accessTokenSignError)
                    return [2 /*return*/, next(accessTokenSignError)];
                expiresAt = new Date(Date.now() + configs_1.globals.REFRESH_TOKEN_TTL);
                return [4 /*yield*/, authService.generateRefreshToken(id, expiresAt)];
            case 3:
                _e = _f.sent(), newRefreshToken = _e.refreshToken, refreshTokenGenerationError = _e.err;
                if (refreshTokenGenerationError)
                    return [2 /*return*/, next(refreshTokenGenerationError)];
                res
                    .cookie(configs_1.globals.ACCESS_TOKEN_KEY, newAccessToken, {
                    secure: configs_1.globals.NODE_ENV === "production",
                    httpOnly: true,
                })
                    .cookie(configs_1.globals.REFRESH_TOKEN_KEY, newRefreshToken, {
                    secure: configs_1.globals.NODE_ENV === "production",
                    httpOnly: true,
                })
                    .json({
                    success: true,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.tokenRefresh = tokenRefresh;
//# sourceMappingURL=auth.js.map