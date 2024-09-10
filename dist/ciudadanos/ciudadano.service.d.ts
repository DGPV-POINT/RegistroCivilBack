import { Repository } from 'typeorm';
import { Ciudadano } from './ciudadano.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class CiudadanoService {
    private ciudadanoRepository;
    private readonly httpService;
    private readonly configService;
    constructor(ciudadanoRepository: Repository<Ciudadano>, httpService: HttpService, configService: ConfigService);
    guardarCiudadano(data: any, dactilar: string): Promise<Ciudadano>;
    obtenerTodos(queryParams: {
        NOMBRE?: string;
        NUI?: string;
        FECHACONSULTA?: Date;
    }): Promise<Ciudadano[]>;
    findByNUI(NUI: string): Promise<Ciudadano>;
    autenticarRegistroCivil(): Promise<string>;
    consultarDactilar(cedula: string, dactilar: string): Promise<any>;
    private handleAxiosError;
}
