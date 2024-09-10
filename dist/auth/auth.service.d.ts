import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/usuario.entity';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwtToken(user: Usuario): string;
}
