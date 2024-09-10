import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';


@Controller('api/v1/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

/*   @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.createUsuario(createUsuarioDto.Nombre, createUsuarioDto.Clave);
  } */

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':Nombre')
  async findOne(@Param('Nombre') Nombre: string): Promise<Usuario> {
    return this.usuarioService.findByNombre(Nombre);
  }


}
