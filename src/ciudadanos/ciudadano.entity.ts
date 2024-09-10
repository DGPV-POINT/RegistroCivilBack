import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CIUDADANOS')
export class Ciudadano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  NUI: string;

  @Column({ type: 'varchar', length: 10 })
  CODIGODACTILAR: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBRE: string;

  @Column({ type: 'varchar', length: 255 })
  APELLIDOS: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBRES: string;

  @Column({ type: 'varchar', length: 10 })
  SEXO: string;

  @Column({ type: 'varchar', length: 10 })
  FECHANACIMIENTO: string;

  @Column({ type: 'varchar', length: 10 })
  FECHACEDULACION: string;

  @Column({ type: 'varchar', length: 50 })
  INSTRUCCION: string;

  @Column({ type: 'varchar', length: 100 })
  PROFESION: string;

  @Column({ type: 'varchar', length: 50 })
  NACIONALIDAD: string;

  @Column({ type: 'varchar', length: 50 })
  CONDICIONCEDULADO: string;

  @Column({ type: 'varchar', length: 50 })
  ESTADOCIVIL: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBREPADRE: string;

  @Column({ type: 'varchar', length: 255 })
  NOMBREMADRE: string;

  @Column({ type: 'text'})
  FOTO: string; // Base64 image

  @Column({ type: 'text' })
  FIRMA: string; // Base64 image

  @Column({ type: 'varchar', length: 255 })
  DOMICILIO: string;

  @Column({ type: 'varchar', length: 255 })
  CALLE: string;

  @Column({ type: 'varchar', length: 10 })
  NUMEROCASA: string;

  @Column({ type: 'varchar', length: 255 })
  LUGARNACIMIENTO: string;

  @Column({ type: 'varchar', length: 255 })
  CONYUGE: string;

  @Column({ type: 'varchar', length: 10 })
  FECHAMATRIMONIO: string;

  @Column({ type: 'varchar', length: 10 })
  FECHAFALLECIMIENTO: string;

  @Column({ type: 'date' })
  FECHACONSULTA: Date;
}
