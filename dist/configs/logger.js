"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var winston_1 = require("winston");
var globals_1 = __importDefault(require("./globals"));
var isProduction = globals_1.default.NODE_ENV === "production";
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};
var filters = {
    error: (0, winston_1.format)(function (info) { return (info.level === "error" ? info : false); }),
    warn: (0, winston_1.format)(function (info) { return (info.level === "warn" ? info : false); }),
    info: (0, winston_1.format)(function (info) { return (info.level === "info" ? info : false); }),
    http: (0, winston_1.format)(function (info) { return (info.level === "http" ? info : false); }),
};
var logger = (0, winston_1.createLogger)({
    exitOnError: false,
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({
                colors: {
                    error: "red",
                    info: "green",
                    warn: "yellow",
                    http: "purple",
                },
            }), winston_1.format.timestamp(), winston_1.format.cli(), winston_1.format.align(), winston_1.format.printf(function (template) {
                return "[".concat(template.level, "]: ").concat(template.message.trim(), " on ").concat(template.timestamp);
            })),
        }),
        new winston_1.transports.File({
            format: winston_1.format.combine(filters.warn(), winston_1.format.timestamp(), winston_1.format.json()),
            filename: path_1.default.resolve(isProduction ? "dist/logs/warn.log" : "src/logs/warn.log"),
            level: "warn",
        }),
        new winston_1.transports.File({
            format: winston_1.format.combine(filters.error(), winston_1.format.timestamp(), winston_1.format.json()),
            filename: path_1.default.resolve(isProduction ? "dist/logs/error.log" : "src/logs/error.log"),
            level: "error",
        }),
        new winston_1.transports.File({
            format: winston_1.format.combine(filters.info(), winston_1.format.timestamp(), winston_1.format.json()),
            filename: path_1.default.resolve(isProduction ? "dist/logs/info.log" : "src/logs/info.log"),
            level: "info",
        }),
        new winston_1.transports.File({
            format: winston_1.format.combine(filters.http(), winston_1.format.timestamp(), winston_1.format.json()),
            filename: path_1.default.resolve(isProduction ? "dist/logs/http.log" : "src/logs/http.log"),
            level: "http",
        }),
    ],
    rejectionHandlers: new winston_1.transports.File({
        format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
        filename: path_1.default.resolve(isProduction ? "dist/logs/rejections.log" : "src/logs/rejections.log"),
    }),
    levels: levels,
});
exports.default = logger;
//# sourceMappingURL=logger.js.map