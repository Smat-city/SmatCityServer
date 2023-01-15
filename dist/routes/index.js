"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.accomodationsRouter = exports.usersRouter = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var accomodations_1 = require("./accomodations");
Object.defineProperty(exports, "accomodationsRouter", { enumerable: true, get: function () { return __importDefault(accomodations_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
//# sourceMappingURL=index.js.map