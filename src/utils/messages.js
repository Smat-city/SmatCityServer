"use strict";
exports.__esModule = true;
exports["default"] = {
    REQUIRED: function (fieldname) { return "".concat(fieldname, " is required"); },
    LIMIT: function (fieldname, min, max) {
        return "".concat(fieldname, " ").concat(min ? "should be a minimum of ".concat(min.toString(), " characters") : "").concat(min && max ? " and " : "").concat(max ? "should not exceed ".concat(max.toString(), " characters") : "");
    },
    NOTEMPTY: function (fieldname) { return "".concat(fieldname, " should not be empty"); },
    EMAIL: "Invalid email address",
    EXISTS: function (fieldname) { return "".concat(fieldname, " already exists"); },
    TYPE_ERROR: "Invalid type"
};
