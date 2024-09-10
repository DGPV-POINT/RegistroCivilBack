import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  idUsuario: number;

  @Column({ length: 50, nullable: true })
  Nombre: string;

  @Column({ length: 50, nullable: true })
  Clave: string;

  @Column({ nullable: true })
  idGrupo: number;

  @Column({ nullable: true })
  Sexo: number;

  @Column({ length: 50, nullable: true })
  Iniciales: string;

  @Column({ type: 'datetime', nullable: true })
  FechaIngreso: Date;

  @Column({ type: 'tinyint', nullable: true })
  Activo: boolean;

  @Column({ nullable: true })
  idDepartamento: number;

  @Column({ nullable: true })
  Nivel: number;

  @Column({ length: 50, nullable: true })
  Usuario: string;

  @Column({ length: 50, nullable: true })
  DireccionIP: string;

  @Column({ type: 'tinyint', nullable: true })
  Recordatorios: boolean;
}
