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
var typeorm_1 = require("typeorm");
var interfaces_1 = require("../interfaces");
// eslint-disable-next-line import/no-cycle
var Address_1 = __importDefault(require("./Address"));
// eslint-disable-next-line import/no-cycle
var Media_1 = __importDefault(require("./Media"));
var Accomodation = /** @class */ (function (_super) {
    __extends(Accomodation, _super);
    function Accomodation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Accomodation.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Accomodation.prototype, "verified", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Accomodation.prototype, "compoundType", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Accomodation.prototype, "houseType", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Accomodation.prototype, "tiled", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Accomodation.prototype, "waterSupply", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Accomodation.prototype, "security", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Media_1.default; }, function (media) { return media.accomodation; }),
        __metadata("design:type", Array)
    ], Accomodation.prototype, "media", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Address_1.default; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Address_1.default)
    ], Accomodation.prototype, "address", void 0);
    Accomodation = __decorate([
        (0, typeorm_1.Entity)()
    ], Accomodation);
    return Accomodation;
}(interfaces_1.BaseEntity));
exports.default = Accomodation;
//# sourceMappingURL=Accomodation.js.map