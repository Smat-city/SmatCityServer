"use strict";
exports.__esModule = true;
var bull_1 = require("bull");
var logger_1 = require("./logger");
var queue = new bull_1["default"]("queue:schedule");
queue
    .process(function () { })["catch"](function (err) {
    logger_1["default"].error(err);
});
exports["default"] = queue;
