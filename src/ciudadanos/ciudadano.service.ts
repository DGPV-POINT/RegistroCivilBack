import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Ciudadano } from './ciudadano.entity';
import { HttpService } from '@nestjs/axios'; // Necesario para hacer peticiones HTTP
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class CiudadanoService {
  constructor(
    @InjectRepository(Ciudadano)
    private ciudadanoRepository: Repository<Ciudadano>,
    private readonly httpService: HttpService, // Inyectamos el HttpService
    private readonly configService: ConfigService,
  ) {}

  async guardarCiudadano(data: any, dactilar: string): Promise<Ciudadano> {
    try {
      const ciudadano = new Ciudadano();
      ciudadano.NUI = data.NUI;
      ciudadano.CODIGODACTILAR = dactilar;
      ciudadano.NOMBRE = data.NOMBRE;
      ciudadano.NOMBRES = data.NOMBRES;
      ciudadano.APELLIDOS = data.APELLIDOS;
      ciudadano.SEXO = data.SEXO;
      ciudadano.FECHANACIMIENTO = data.FECHANACIMIENTO;
      ciudadano.FECHACEDULACION = data.FECHACEDULACION;
      ciudadano.INSTRUCCION = data.INSTRUCCION;
      ciudadano.PROFESION = data.PROFESION;
      ciudadano.NACIONALIDAD = data.NACIONALIDAD;
      ciudadano.CONDICIONCEDULADO = data.CONDICIONCEDULADO;
      ciudadano.ESTADOCIVIL = data.ESTADOCIVIL;
      ciudadano.NOMBREPADRE = data.NOMBREPADRE;
      ciudadano.NOMBREMADRE = data.NOMBREMADRE;
      ciudadano.FOTO = data.FOTO;
      ciudadano.FIRMA = data.FIRMA;
      ciudadano.DOMICILIO = data.DOMICILIO.DOMICILIO;
      ciudadano.CALLE = data.DOMICILIO.CALLE;
      ciudadano.NUMEROCASA = data.DOMICILIO.NUMEROCASA;
      ciudadano.LUGARNACIMIENTO = data.NACIMIENTO.LUGARNACIMIENTO;
      ciudadano.CONYUGE = data.CONYUGE.CONYUGE;
      ciudadano.FECHAMATRIMONIO = data.CONYUGE.FECHAMATRIMONIO;
      ciudadano.FECHAFALLECIMIENTO = data.DEFUNCION.FECHAFALLECIMIENTO;
      ciudadano.FECHACONSULTA = new Date();

      return await this.ciudadanoRepository.save(ciudadano);
    } catch (error) {
      console.error('Error al guardar ciudadano:', error.message);
      throw new HttpException(
        'Error al guardar los datos del ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async obtenerTodos(queryParams: {
    NOMBRE?: string;
    NUI?: string;
    FECHACONSULTA?: Date;
  }): Promise<Ciudadano[]> {
    try {
      // Creamos una estructura de filtro basada en los parámetros proporcionados
      const filters: FindOptionsWhere<Ciudadano> = {};

      if (queryParams.NOMBRE) {
        filters.NOMBRE = Like(`%${queryParams.NOMBRE}%`); // Busqueda parcial por nombre
      }

      if (queryParams.NUI) {
        filters.NUI = queryParams.NUI; // Busqueda exacta por NUI
      }

      // Si no se proveen parámetros, la consulta retornará todos los registros
      return await this.ciudadanoRepository.find({
        where: filters,
      });
    } catch (error) {
      console.error('Error al obtener ciudadanos con filtros:', error.message);
      throw new HttpException(
        'Error al obtener los datos de los ciudadanos con filtros',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByNUI(NUI: string): Promise<Ciudadano> {
    try {
      const ciudadano = await this.ciudadanoRepository.findOneBy({ NUI });
      if (!ciudadano) {
        throw new HttpException(
          'Ciudadano no encontrado en nuestra BDD',
          HttpStatus.NOT_FOUND,
        );
      }
      return ciudadano;
    } catch (error) {
      console.error(
        `Error al buscar ciudadano con Cédula ${NUI}:`,
        error.message,
      );
      throw new HttpException(
        'Error al buscar el ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async autenticarRegistroCivil(): Promise<string> {
    const authUrl = this.configService.get<string>('API_URL_AUTH');
    const username = this.configService.get<string>('RC_USERNAME');
    const password = this.configService.get<string>('RC_PASSWORD');
    try {
      const authResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          authUrl,
          {
            username: username,
            password: password,
          },
          { headers: { 'Content-Type': 'application/json' } },
        ),
      );
      return authResponse.data.auth.token;
    } catch (error) {
      console.error('Error al autenticar en Registro Civil:', error.message);
      throw new HttpException(
        'Error en la autenticación con Registro Civil',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Método para consultar el registro dactilar
  async consultarDactilar(cedula: string, dactilar: string): Promise<any> {
    const tokenRC = await this.autenticarRegistroCivil();
    const dactilarTruncado = dactilar.slice(0, 6);
    const apiUrl = this.configService.get<string>('API_URL_ADC');

    const username = this.configService.get<string>('RC_USERNAME');
    const codigoInstitucion = this.configService.get<string>('RC_CODIGO_INST');
    const codigoAgencia = this.configService.get<string>('RC_CODIGO_AG');

    try {
      const dacResponse: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          apiUrl,
          {
            username: username,
            codigoInstitucion: codigoInstitucion,
            codigoAgencia: codigoAgencia,
            nui: cedula,
            codigoDactilar: dactilarTruncado,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenRC}`,
            },
          },
        ),
      );
      /* console.log(
        'datos consultados a la API del registro civil: ',
        dacResponse.data,
      ); */
      // Si la consulta es exitosa y el código de respuesta es '000'
      if (dacResponse.data.codigo === '000') {
        return await this.guardarCiudadano(
          dacResponse.data.ciudadano,
          dactilar,
        );
      } else {
        throw new HttpException(
          'Consulta fallida en Registro Civil',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // Manejo de errores de Axios
  private handleAxiosError(error: any): void {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data);
      throw new HttpException(
        `Error en la consulta: ${JSON.stringify(error.response.data)}`,
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
      throw new HttpException(
        'No se obtuvo respuesta del servidor de Registro Civil',
        HttpStatus.GATEWAY_TIMEOUT,
      );
    } else {
      console.error(
        'Error en la configuración de la solicitud:',
        error.message,
      );
      throw new HttpException(
        'Error interno en la configuración de la consulta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
