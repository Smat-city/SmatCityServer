"use strict";
exports.__esModule = true;
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var express_1 = require("express");
var helmet_1 = require("helmet");
var http_status_codes_1 = require("http-status-codes");
var jsonwebtoken_1 = require("jsonwebtoken");
var morgan_1 = require("morgan");
var zod_1 = require("zod");
var configs_1 = require("../configs");
var routes_1 = require("../routes");
var server = (0, express_1["default"])();
server.use((0, cors_1["default"])(configs_1.globals.CORS_OPTIONS));
server.use((0, cookie_parser_1["default"])());
server.use((0, helmet_1["default"])());
server.use((0, compression_1["default"])());
server.use((0, express_1.json)());
server.use((0, express_1.urlencoded)({
    extended: true
}));
server.use(configs_1.passportConfig.passport.initialize());
server.use((0, morgan_1["default"])("combined", {
    stream: {
        write: function (message) {
            configs_1.logger.http(message.trim());
        }
    }
}));
server.use("/auth", routes_1.authRouter);
server.use("/accomodations", routes_1.accomodationsRouter);
server.use("/users", routes_1.usersRouter);
server.use("*", function (req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        code: configs_1.globals.CODE_NOT_FOUND,
        message: "This route does not exist"
    });
});
server.use(function (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    var _a, _b, _c;
    configs_1.logger.error(err.message);
    if (err instanceof zod_1.ZodError) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            code: configs_1.globals.CODE_VALIDATION_ERROR,
            errors: err.flatten().fieldErrors
        });
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            code: configs_1.globals.CODE_TOKEN_EXPIRED,
            error: err.message
        });
    }
    res.status((_a = err.status) !== null && _a !== void 0 ? _a : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        code: err.message === "Unauthorized"
            ? configs_1.globals.CODE_UNAUTHORIZED
            : (_b = err.code) !== null && _b !== void 0 ? _b : configs_1.globals.CODE_SERVER_ERROR,
        error: configs_1.globals.NODE_ENV === "production" &&
            err.status === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR
            ? undefined
            : (_c = err.message) !== null && _c !== void 0 ? _c : "An unknown error ocurred!"
    });
});
exports["default"] = server;
