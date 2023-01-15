"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
var bcrypt_1 = require("bcrypt");
var hash = function (payload, salt) {
    return (0, bcrypt_1.hashSync)(payload, salt !== null && salt !== void 0 ? salt : 10);
};
exports.hash = hash;
var compare = function (payload, hashedPayload) {
    return (0, bcrypt_1.compareSync)(payload, hashedPayload);
};
exports.compare = compare;
//# sourceMappingURL=hashManager.js.map