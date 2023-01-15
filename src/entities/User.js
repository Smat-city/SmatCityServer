"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["basic"] = "basic";
    UserRole["pro"] = "pro";
})(UserRole || (UserRole = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "firstname");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "lastname");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], User.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            unique: true
        })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bool",
            "default": 0
        })
    ], User.prototype, "verified");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": [UserRole.basic, UserRole.pro, UserRole.admin],
            "default": UserRole.basic
        })
    ], User.prototype, "type");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}(interfaces_1.BaseEntity));
exports["default"] = User;
