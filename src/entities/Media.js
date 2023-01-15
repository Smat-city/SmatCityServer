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
exports.MediaTag = exports.MediaType = void 0;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
// eslint-disable-next-line import/no-cycle
var Accomodation_1 = require("./Accomodation");
var MediaType;
(function (MediaType) {
    MediaType["image"] = "image";
    MediaType["video"] = "video";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var MediaTag;
(function (MediaTag) {
    MediaTag["bathroom"] = "bathroom";
    MediaTag["compound"] = "compound";
    MediaTag["kitchen"] = "kitchen";
    MediaTag["room"] = "room";
    MediaTag["toilet"] = "toilet";
})(MediaTag = exports.MediaTag || (exports.MediaTag = {}));
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)()
    ], Media.prototype, "url");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": [MediaType.image, MediaType.video]
        })
    ], Media.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": [
                MediaTag.bathroom,
                MediaTag.compound,
                MediaTag.kitchen,
                MediaTag.room,
                MediaTag.toilet,
            ]
        })
    ], Media.prototype, "tag");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Accomodation_1["default"]; }, function (accomodation) { return accomodation.media; })
    ], Media.prototype, "accomodation");
    Media = __decorate([
        (0, typeorm_1.Entity)()
    ], Media);
    return Media;
}(interfaces_1.BaseEntity));
exports["default"] = Media;
