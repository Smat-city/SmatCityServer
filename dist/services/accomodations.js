"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var tsyringe_1 = require("tsyringe");
var typeorm_1 = require("typeorm");
var Accomodation_1 = __importDefault(require("../entities/Accomodation"));
var AccomodationService = /** @class */ (function () {
    function AccomodationService(entityManager) {
        this.entityManager = entityManager;
    }
    AccomodationService.prototype.create = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.entityManager.insert(Accomodation_1.default, __assign({}, payload))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                err: null,
                            }];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                err: err_1,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccomodationService.prototype.getAll = function (filters, all) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = filters === null || filters === void 0 ? void 0 : filters.budgetFrom;
                        to = filters === null || filters === void 0 ? void 0 : filters.budgetTo;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.entityManager.find(Accomodation_1.default, {
                                relations: {
                                    address: all,
                                    media: true,
                                },
                                where: !filters && all
                                    ? undefined
                                    : __assign(__assign(__assign({}, lodash_1.default.omit(filters, "budgetFrom", "budgetTo")), (from && to
                                        ? {
                                            initialFee: (0, typeorm_1.Between)(from, to),
                                        }
                                        : {})), (all ? {} : { verified: true })),
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, {
                                result: result,
                                err: null,
                            }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                result: null,
                                err: err_2,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AccomodationService = __decorate([
        (0, tsyringe_1.injectable)(),
        (0, tsyringe_1.singleton)(),
        __param(0, (0, tsyringe_1.inject)("entityManager")),
        __metadata("design:paramtypes", [typeorm_1.EntityManager])
    ], AccomodationService);
    return AccomodationService;
}());
exports.default = AccomodationService;
//# sourceMappingURL=accomodations.js.map