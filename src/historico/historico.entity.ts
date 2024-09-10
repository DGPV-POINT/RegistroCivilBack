import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('HISTORICO')
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column()
  idUsuario: string;

  @Column()
  cedulaConsultada: string;

  @Column({ default: 0 })
  cantidadConsultas: number;

  @CreateDateColumn()
  fechaConsulta: Date;

  @Column({ nullable: true })
  ip: string;
  
  @Column({ default: false })
  apiRC: boolean;
}
