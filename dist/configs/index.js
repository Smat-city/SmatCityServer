"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = exports.passportConfig = exports.fileMiddleware = exports.logger = exports.globals = void 0;
var globals_1 = require("./globals");
Object.defineProperty(exports, "globals", { enumerable: true, get: function () { return __importDefault(globals_1).default; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return __importDefault(logger_1).default; } });
var multer_1 = require("./multer");
Object.defineProperty(exports, "fileMiddleware", { enumerable: true, get: function () { return __importDefault(multer_1).default; } });
exports.passportConfig = __importStar(require("./passport"));
var db_1 = require("./db");
Object.defineProperty(exports, "dbClient", { enumerable: true, get: function () { return __importDefault(db_1).default; } });
//# sourceMappingURL=index.js.map