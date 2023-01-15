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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTag = exports.MediaType = void 0;
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
// eslint-disable-next-line import/no-cycle
var Accomodation_1 = __importDefault(require("./Accomodation"));
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
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Media.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: [MediaType.image, MediaType.video],
        }),
        __metadata("design:type", String)
    ], Media.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: [
                MediaTag.bathroom,
                MediaTag.compound,
                MediaTag.kitchen,
                MediaTag.room,
                MediaTag.toilet,
            ],
        }),
        __metadata("design:type", String)
    ], Media.prototype, "tag", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Accomodation_1.default; }, function (accomodation) { return accomodation.media; }),
        __metadata("design:type", Accomodation_1.default)
    ], Media.prototype, "accomodation", void 0);
    Media = __decorate([
        (0, typeorm_1.Entity)()
    ], Media);
    return Media;
}(interfaces_1.BaseEntity));
exports.default = Media;
//# sourceMappingURL=Media.js.map