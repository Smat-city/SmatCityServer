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
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CORS_OPTIONS: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
    DB_HOST: process.env.APP_DB_HOST,
    DB_USER: process.env.APP_DB_USER,
    DB_PASSWORD: process.env.APP_DB_PASSWORD,
    DB_CLIENT: process.env.APP_DB_CLIENT,
    DB_PORT: process.env.APP_DB_PORT,
    DB_NAME: process.env.APP_DB_NAME,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL,
    REFRESH_TOKEN_TTL: Number(process.env.REFRESH_TOKEN_TTL),
    CODE_UNAUTHORIZED: Number(process.env.CODE_UNAUTHORIZED),
    CODE_INVALID_CREDENTIALS: Number(process.env.CODE_INVALID_CREDENTIALS),
    CODE_VALIDATION_ERROR: Number(process.env.CODE_VALIDATION_ERROR),
    CODE_SERVER_ERROR: Number(process.env.CODE_SERVER_ERROR),
    CODE_EMAIL_NOT_VERIFIED: Number(process.env.CODE_EMAIL_NOT_VERIFIED),
    CODE_FIELD_EXISTS: Number(process.env.CODE_FIELD_EXISTS),
    CODE_TOKEN_EXPIRED: Number(process.env.CODE_TOKEN_EXPIRED),
    CODE_NOT_FOUND: Number(process.env.CODE_NOT_FOUND),
};
//# sourceMappingURL=globals.js.map