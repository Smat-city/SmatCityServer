"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var authenticate = middlewares_1.authMiddleware.authenticate;
var register = controllers_1.authController.register, login = controllers_1.authController.login, logout = controllers_1.authController.logout, tokenRefresh = controllers_1.authController.tokenRefresh, user = controllers_1.authController.user;
var router = (0, express_1.Router)();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/user", authenticate, user);
router.post("/refresh", authenticate, tokenRefresh);
exports.default = router;
//# sourceMappingURL=auth.js.map