import { HistoricoService } from './historico.service';
import { Request } from 'express';
export declare class HistoricoController {
    private readonly historicoService;
    constructor(historicoService: HistoricoService);
    obtenerHistorial(): Promise<import("./historico.entity").Historico[]>;
    registrarConsulta(request: Request, cedula: string, apiRC: boolean): Promise<import("./historico.entity").Historico>;
}
