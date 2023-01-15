"use strict";
exports.__esModule = true;
var express_1 = require("express");
var configs_1 = require("../configs");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var getAllAccomodations = controllers_1.accomodationsController.getAllAccomodations, addAccomodation = controllers_1.accomodationsController.addAccomodation;
var router = (0, express_1.Router)();
var authenticate = middlewares_1.authMiddleware.authenticate;
router.post("/", configs_1.fileMiddleware.array("media"), authenticate, addAccomodation);
router.get("/", getAllAccomodations);
exports["default"] = router;
