"use strict";
exports.__esModule = true;
exports.createAccomodationsSchema = exports.getAccomodationsSchema = void 0;
var zod_1 = require("zod");
var utils_1 = require("../utils");
exports.getAccomodationsSchema = (0, zod_1.object)({
    houseType: (0, zod_1.string)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    compoundType: (0, zod_1.string)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    tiled: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    waterSupply: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    security: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    budgetFrom: (0, zod_1.number)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional(),
    budgetTo: (0, zod_1.number)({
        invalid_type_error: utils_1.messages.TYPE_ERROR
    }).optional()
});
exports.createAccomodationsSchema = (0, zod_1.object)({
    houseType: (0, zod_1.string)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("houseType")
    }),
    compoundType: (0, zod_1.string)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("compundType")
    }),
    tiled: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("tiled")
    }),
    waterSupply: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("waterSupply")
    }),
    security: (0, zod_1.boolean)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("security")
    }),
    initialFee: (0, zod_1.number)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("initialFee")
    }),
    subsequentFee: (0, zod_1.number)({
        invalid_type_error: utils_1.messages.TYPE_ERROR,
        required_error: utils_1.messages.REQUIRED("subsequentFee")
    }),
    address: (0, zod_1.object)({
        address: (0, zod_1.string)(),
        city: (0, zod_1.string)(),
        state: (0, zod_1.string)(),
        country: (0, zod_1.string)()
    }, {
        required_error: utils_1.messages.REQUIRED("address")
    })
});
