"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bull_1 = __importDefault(require("bull"));
var logger_1 = __importDefault(require("./logger"));
var queue = new bull_1.default("queue:schedule");
queue
    .process(function () { })
    .catch(function (err) {
    logger_1.default.error(err);
});
exports.default = queue;
//# sourceMappingURL=queue.js.map