import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './JwtAuthGuard';
import { User } from './user.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usuarioService.findByNombre(loginDto.Nombre);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales inválidas: usuario no encontrado',
      });
    }

    const isPasswordValid = loginDto.password === user.Clave;
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales inválidas: contraseña incorrecta',
      });
    }

    const token = await this.authService.generateJwtToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user) {
    return user;
  }
}
