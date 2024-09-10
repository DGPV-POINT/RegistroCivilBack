"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoricoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historico_service_1 = require("./historico.service");
const historico_entity_1 = require("./historico.entity");
const historico_controller_1 = require("./historico.controller");
const auth_module_1 = require("../auth/auth.module");
const axios_1 = require("@nestjs/axios");
let HistoricoModule = class HistoricoModule {
};
exports.HistoricoModule = HistoricoModule;
exports.HistoricoModule = HistoricoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([historico_entity_1.Historico]), auth_module_1.AuthModule, axios_1.HttpModule],
        providers: [historico_service_1.HistoricoService],
        controllers: [historico_controller_1.HistoricoController],
        exports: [historico_service_1.HistoricoService],
    })
], HistoricoModule);
//# sourceMappingURL=historico.module.js.map