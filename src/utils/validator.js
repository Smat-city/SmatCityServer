"use strict";
exports.__esModule = true;
exports["default"] = (function (schema, data) {
    try {
        var validated = schema.parse(data);
        return {
            validated: validated,
            error: null
        };
    }
    catch (error) {
        return {
            validated: null,
            error: error
        };
    }
});
