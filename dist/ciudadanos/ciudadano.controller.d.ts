import { CiudadanoService } from './ciudadano.service';
export declare class CiudadanoController {
    private readonly ciudadanoService;
    constructor(ciudadanoService: CiudadanoService);
    consultarDactilar(body: {
        cedula: string;
        dactilar: string;
    }): Promise<any>;
    obtenerTodos(NOMBRE?: string, NUI?: string): Promise<any>;
    findByNUI(cedula: string): Promise<any>;
}
