"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var authenticate = middlewares_1.authMiddleware.authenticate;
var users = controllers_1.usersController.users, user = controllers_1.usersController.user;
var router = (0, express_1.Router)();
router.use(authenticate);
router.get("/", users);
router.get("/:id", user);
exports.default = router;
//# sourceMappingURL=users.js.map