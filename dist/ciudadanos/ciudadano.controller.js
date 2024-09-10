"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CiudadanoController = void 0;
const common_1 = require("@nestjs/common");
const JwtAuthGuard_1 = require("../auth/JwtAuthGuard");
const ciudadano_service_1 = require("./ciudadano.service");
let CiudadanoController = class CiudadanoController {
    constructor(ciudadanoService) {
        this.ciudadanoService = ciudadanoService;
    }
    async consultarDactilar(body) {
        const { cedula, dactilar } = body;
        try {
            const ciudadanoGuardado = await this.ciudadanoService.consultarDactilar(cedula, dactilar);
            if (!ciudadanoGuardado) {
                throw new common_1.HttpException('No se pudo encontrar ni guardar los datos del ciudadano', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Consulta dactilar realizada con éxito',
                data: ciudadanoGuardado,
            };
        }
        catch (error) {
            console.error('Error en la consulta dactilar:', error.message);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error interno en la consulta dactilar', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerTodos(NOMBRE, NUI) {
        try {
            const queryParams = {
                NOMBRE,
                NUI,
            };
            const ciudadanos = await this.ciudadanoService.obtenerTodos(queryParams);
            if (!ciudadanos || ciudadanos.length === 0) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'No se encontraron ciudadanos',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Ciudadanos obtenidos exitosamente',
                data: ciudadanos,
            };
        }
        catch (error) {
            console.error('Error al obtener todos los ciudadanos:', error.message);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error interno al obtener los ciudadanos',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByNUI(cedula) {
        try {
            const ciudadano = await this.ciudadanoService.findByNUI(cedula);
            if (!ciudadano) {
                throw new common_1.HttpException(`No se encontró un ciudadano con la cédula ${cedula}`, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Ciudadano encontrado',
                data: ciudadano,
            };
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.HttpException('Error interno al buscar el ciudadano', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CiudadanoController = CiudadanoController;
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Post)('consulta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CiudadanoController.prototype, "consultarDactilar", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('NOMBRE')),
    __param(1, (0, common_1.Query)('NUI')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CiudadanoController.prototype, "obtenerTodos", null);
__decorate([
    (0, common_1.UseGuards)(JwtAuthGuard_1.JwtAuthGuard),
    (0, common_1.Get)(':cedula'),
    __param(0, (0, common_1.Param)('cedula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiudadanoController.prototype, "findByNUI", null);
exports.CiudadanoController = CiudadanoController = __decorate([
    (0, common_1.Controller)('api/v1/dactilar'),
    __metadata("design:paramtypes", [ciudadano_service_1.CiudadanoService])
], CiudadanoController);
//# sourceMappingURL=ciudadano.controller.js.map