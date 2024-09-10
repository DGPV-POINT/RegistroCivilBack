import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findByNombre(Nombre: string): Promise<Usuario | undefined>;
    findAll(): Promise<Usuario[]>;
    validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
