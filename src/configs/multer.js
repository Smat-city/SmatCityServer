"use strict";
exports.__esModule = true;
exports.fileFilter = void 0;
var multer = require("multer");
var acceptedMimetypes = ["image/png", "image/jpeg", "image/jpg"];
var fileFilter = function (req, file, callback) {
    if (!acceptedMimetypes.includes(file.mimetype))
        return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    callback(null, true);
};
exports.fileFilter = fileFilter;
var fileMiddleware = multer["default"]({
    fileFilter: exports.fileFilter
});
exports["default"] = fileMiddleware;
