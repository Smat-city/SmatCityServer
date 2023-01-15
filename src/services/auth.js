"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.__esModule = true;
var crypto_1 = require("crypto");
var http_status_codes_1 = require("http-status-codes");
var tsyringe_1 = require("tsyringe");
var configs_1 = require("../configs");
var entities_1 = require("../entities");
var Token_1 = require("../entities/Token");
var interfaces_1 = require("../interfaces");
var utils_1 = require("../utils");
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService(entityManager) {
        var _this = _super.call(this) || this;
        _this.entityManager = entityManager;
        return _this;
    }
    AuthService.prototype.createUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, firstname, lastname, email, usernameExists, emailExists, hashedPassword, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = payload.username, password = payload.password, firstname = payload.firstname, lastname = payload.lastname, email = payload.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.entityManager.count(entities_1.User, {
                                where: {
                                    username: username
                                }
                            })];
                    case 2:
                        usernameExists = (_a.sent()) !== 0;
                        return [4 /*yield*/, this.entityManager.count(entities_1.User, {
                                where: {
                                    email: email
                                }
                            })];
                    case 3:
                        emailExists = (_a.sent()) !== 0;
                        if (usernameExists) {
                            throw new utils_1.CustomError(utils_1.messages.EXISTS("username"), configs_1.globals.CODE_FIELD_EXISTS, http_status_codes_1.StatusCodes.CONFLICT);
                        }
                        if (emailExists) {
                            throw new utils_1.CustomError(utils_1.messages.EXISTS("email"), configs_1.globals.CODE_FIELD_EXISTS, http_status_codes_1.StatusCodes.CONFLICT);
                        }
                        hashedPassword = utils_1.hashManager.hash(password);
                        return [4 /*yield*/, this.entityManager.insert(entities_1.User, {
                                username: username,
                                password: hashedPassword,
                                firstname: firstname,
                                lastname: lastname,
                                email: email
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, {
                                err: null
                            }];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                err: err_1
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = payload.username;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityManager.findOne(entities_1.User, {
                                select: {
                                    id: true,
                                    username: true,
                                    firstname: true,
                                    lastname: true,
                                    email: true,
                                    password: true,
                                    type: true,
                                    verified: true
                                },
                                where: {
                                    username: username
                                }
                            })];
                    case 2:
                        user = (_a.sent());
                        return [2 /*return*/, {
                                user: user,
                                err: null
                            }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                user: null,
                                err: err_2
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.generateRefreshToken = function (userId, expiresAt) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        refreshToken = (0, crypto_1.randomUUID)();
                        return [4 /*yield*/, this.entityManager.findOne(entities_1.User, {
                                where: {
                                    id: userId
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.entityManager.save(entities_1.Token, {
                                type: Token_1.TokenType.refresh,
                                token: refreshToken,
                                expiresAt: expiresAt,
                                user: user
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                refreshToken: refreshToken,
                                err: null
                            }];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                err: err_3
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.revokeRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.entityManager["delete"](entities_1.Token, {
                                token: token,
                                type: Token_1.TokenType.refresh
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                err: null
                            }];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, {
                                err: err_4
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getRefreshToken = function (token, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.entityManager.findOne(entities_1.Token, {
                                select: {
                                    id: true,
                                    token: true,
                                    expiresAt: true
                                },
                                where: {
                                    token: token,
                                    type: Token_1.TokenType.refresh,
                                    user: {
                                        id: userId
                                    }
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, {
                                result: result,
                                err: null
                            }];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, {
                                result: null,
                                err: err_5
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, tsyringe_1.injectable)(),
        (0, tsyringe_1.singleton)(),
        __param(0, (0, tsyringe_1.inject)("entityManager"))
    ], AuthService);
    return AuthService;
}(interfaces_1.TransactionService));
exports["default"] = AuthService;
