"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (schema, data) {
    try {
        var validated = schema.parse(data);
        return {
            validated: validated,
            error: null,
        };
    }
    catch (error) {
        return {
            validated: null,
            error: error,
        };
    }
});
//# sourceMappingURL=validator.js.map