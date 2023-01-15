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
// eslint-disable-next-line import/no-cycle
var Address_1 = require("./Address");
// eslint-disable-next-line import/no-cycle
var Media_1 = require("./Media");
var Accomodation = /** @class */ (function (_super) {
    __extends(Accomodation, _super);
    function Accomodation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)()
    ], Accomodation.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], Accomodation.prototype, "verified");
    __decorate([
        (0, typeorm_1.Column)()
    ], Accomodation.prototype, "compoundType");
    __decorate([
        (0, typeorm_1.Column)()
    ], Accomodation.prototype, "houseType");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], Accomodation.prototype, "tiled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], Accomodation.prototype, "waterSupply");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], Accomodation.prototype, "security");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Media_1["default"]; }, function (media) { return media.accomodation; })
    ], Accomodation.prototype, "media");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Address_1["default"]; }),
        (0, typeorm_1.JoinColumn)()
    ], Accomodation.prototype, "address");
    Accomodation = __decorate([
        (0, typeorm_1.Entity)()
    ], Accomodation);
    return Accomodation;
}(interfaces_1.BaseEntity));
exports["default"] = Accomodation;
