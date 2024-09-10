import { HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usuarioService;
    constructor(authService: AuthService, usuarioService: UsuarioService);
    login(loginDto: LoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        token: string;
    }>;
    getProfile(user: any): Promise<any>;
}
