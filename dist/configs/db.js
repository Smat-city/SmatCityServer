"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var globals_1 = __importDefault(require("./globals"));
var dbClient = new typeorm_1.DataSource({
    type: "mysql",
    host: globals_1.default.DB_HOST,
    port: (_a = globals_1.default.DB_PORT) !== null && _a !== void 0 ? _a : 3306,
    username: globals_1.default.DB_USER,
    password: globals_1.default.DB_PASSWORD,
    database: globals_1.default.DB_NAME,
    synchronize: globals_1.default.NODE_ENV === "development",
    logging: globals_1.default.NODE_ENV === "development" ? "all" : ["error", "info", "log"],
    entities: [path_1.default.join(__dirname, "../entities/**/*.{js,ts}")],
    subscribers: [],
});
exports.default = dbClient;
//# sourceMappingURL=db.js.map