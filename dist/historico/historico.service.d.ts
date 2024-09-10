import { Repository } from 'typeorm';
import { Historico } from './historico.entity';
export declare class HistoricoService {
    private historicoRepository;
    constructor(historicoRepository: Repository<Historico>);
    registrarConsulta(usuario: string, ip: string, cedula: string, idUsuario: string, apiRC: boolean): Promise<Historico>;
    obtenerHistorial(): Promise<Historico[]>;
}
