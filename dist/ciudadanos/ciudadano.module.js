"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiudadanoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ciudadano_service_1 = require("./ciudadano.service");
const ciudadano_entity_1 = require("./ciudadano.entity");
const ciudadano_controller_1 = require("./ciudadano.controller");
const auth_module_1 = require("../auth/auth.module");
const axios_1 = require("@nestjs/axios");
let CiudadanoModule = class CiudadanoModule {
};
exports.CiudadanoModule = CiudadanoModule;
exports.CiudadanoModule = CiudadanoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ciudadano_entity_1.Ciudadano]), auth_module_1.AuthModule, axios_1.HttpModule],
        providers: [ciudadano_service_1.CiudadanoService],
        controllers: [ciudadano_controller_1.CiudadanoController],
        exports: [ciudadano_service_1.CiudadanoService],
    })
], CiudadanoModule);
//# sourceMappingURL=ciudadano.module.js.map