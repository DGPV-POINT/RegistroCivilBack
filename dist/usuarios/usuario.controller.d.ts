import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findAll(): Promise<Usuario[]>;
    findOne(Nombre: string): Promise<Usuario>;
}
