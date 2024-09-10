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
exports.CiudadanoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ciudadano_entity_1 = require("./ciudadano.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
let CiudadanoService = class CiudadanoService {
    constructor(ciudadanoRepository, httpService, configService) {
        this.ciudadanoRepository = ciudadanoRepository;
        this.httpService = httpService;
        this.configService = configService;
    }
    async guardarCiudadano(data, dactilar) {
        try {
            const ciudadano = new ciudadano_entity_1.Ciudadano();
            ciudadano.NUI = data.NUI;
            ciudadano.CODIGODACTILAR = dactilar;
            ciudadano.NOMBRE = data.NOMBRE;
            ciudadano.NOMBRES = data.NOMBRES;
            ciudadano.APELLIDOS = data.APELLIDOS;
            ciudadano.SEXO = data.SEXO;
            ciudadano.FECHANACIMIENTO = data.FECHANACIMIENTO;
            ciudadano.FECHACEDULACION = data.FECHACEDULACION;
            ciudadano.INSTRUCCION = data.INSTRUCCION;
            ciudadano.PROFESION = data.PROFESION;
            ciudadano.NACIONALIDAD = data.NACIONALIDAD;
            ciudadano.CONDICIONCEDULADO = data.CONDICIONCEDULADO;
            ciudadano.ESTADOCIVIL = data.ESTADOCIVIL;
            ciudadano.NOMBREPADRE = data.NOMBREPADRE;
            ciudadano.NOMBREMADRE = data.NOMBREMADRE;
            ciudadano.FOTO = data.FOTO;
            ciudadano.FIRMA = data.FIRMA;
            ciudadano.DOMICILIO = data.DOMICILIO.DOMICILIO;
            ciudadano.CALLE = data.DOMICILIO.CALLE;
            ciudadano.NUMEROCASA = data.DOMICILIO.NUMEROCASA;
            ciudadano.LUGARNACIMIENTO = data.NACIMIENTO.LUGARNACIMIENTO;
            ciudadano.CONYUGE = data.CONYUGE.CONYUGE;
            ciudadano.FECHAMATRIMONIO = data.CONYUGE.FECHAMATRIMONIO;
            ciudadano.FECHAFALLECIMIENTO = data.DEFUNCION.FECHAFALLECIMIENTO;
            ciudadano.FECHACONSULTA = new Date();
            return await this.ciudadanoRepository.save(ciudadano);
        }
        catch (error) {
            console.error('Error al guardar ciudadano:', error.message);
            throw new common_1.HttpException('Error al guardar los datos del ciudadano', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerTodos(queryParams) {
        try {
            const filters = {};
            if (queryParams.NOMBRE) {
                filters.NOMBRE = (0, typeorm_2.Like)(`%${queryParams.NOMBRE}%`);
            }
            if (queryParams.NUI) {
                filters.NUI = queryParams.NUI;
            }
            return await this.ciudadanoRepository.find({
                where: filters,
            });
        }
        catch (error) {
            console.error('Error al obtener ciudadanos con filtros:', error.message);
            throw new common_1.HttpException('Error al obtener los datos de los ciudadanos con filtros', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByNUI(NUI) {
        try {
            const ciudadano = await this.ciudadanoRepository.findOneBy({ NUI });
            if (!ciudadano) {
                throw new common_1.HttpException('Ciudadano no encontrado en nuestra BDD', common_1.HttpStatus.NOT_FOUND);
            }
            return ciudadano;
        }
        catch (error) {
            console.error(`Error al buscar ciudadano con Cédula ${NUI}:`, error.message);
            throw new common_1.HttpException('Error al buscar el ciudadano', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async autenticarRegistroCivil() {
        const authUrl = this.configService.get('API_URL_AUTH');
        const username = this.configService.get('RC_USERNAME');
        const password = this.configService.get('RC_PASSWORD');
        try {
            const authResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.post(authUrl, {
                username: username,
                password: password,
            }, { headers: { 'Content-Type': 'application/json' } }));
            return authResponse.data.auth.token;
        }
        catch (error) {
            console.error('Error al autenticar en Registro Civil:', error.message);
            throw new common_1.HttpException('Error en la autenticación con Registro Civil', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async consultarDactilar(cedula, dactilar) {
        const tokenRC = await this.autenticarRegistroCivil();
        const dactilarTruncado = dactilar.slice(0, 6);
        const apiUrl = this.configService.get('API_URL_ADC');
        const username = this.configService.get('RC_USERNAME');
        const codigoInstitucion = this.configService.get('RC_CODIGO_INST');
        const codigoAgencia = this.configService.get('RC_CODIGO_AG');
        try {
            const dacResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.post(apiUrl, {
                username: username,
                codigoInstitucion: codigoInstitucion,
                codigoAgencia: codigoAgencia,
                nui: cedula,
                codigoDactilar: dactilarTruncado,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenRC}`,
                },
            }));
            console.log('datos consultados a la API del registro civil: ', dacResponse.data);
            if (dacResponse.data.codigo === '000') {
                return await this.guardarCiudadano(dacResponse.data.ciudadano, dactilar);
            }
            else {
                throw new common_1.HttpException('Consulta fallida en Registro Civil', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.handleAxiosError(error);
        }
    }
    handleAxiosError(error) {
        if (error.response) {
            console.error('Error de respuesta del servidor:', error.response.data);
            throw new common_1.HttpException(`Error en la consulta: ${JSON.stringify(error.response.data)}`, error.response.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else if (error.request) {
            console.error('No hubo respuesta del servidor:', error.request);
            throw new common_1.HttpException('No se obtuvo respuesta del servidor de Registro Civil', common_1.HttpStatus.GATEWAY_TIMEOUT);
        }
        else {
            console.error('Error en la configuración de la solicitud:', error.message);
            throw new common_1.HttpException('Error interno en la configuración de la consulta', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CiudadanoService = CiudadanoService;
exports.CiudadanoService = CiudadanoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ciudadano_entity_1.Ciudadano)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        config_1.ConfigService])
], CiudadanoService);
//# sourceMappingURL=ciudadano.service.js.map