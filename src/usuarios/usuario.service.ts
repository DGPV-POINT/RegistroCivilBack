import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findByNombre(Nombre: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { Nombre } });
  }
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

/*   async createUsuario(Nombre: string, password: string): Promise<Usuario> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = this.usuarioRepository.create({
      Nombre,
      Clave: hashedPassword,
    });
    return this.usuarioRepository.save(newUser);
  } */
}
