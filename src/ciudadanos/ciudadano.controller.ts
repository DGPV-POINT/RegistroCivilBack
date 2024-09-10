import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { CiudadanoService } from './ciudadano.service';

@Controller('api/v1/dactilar')

export class CiudadanoController {
  constructor(private readonly ciudadanoService: CiudadanoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('consulta')
  async consultarDactilar(
    @Body() body: { cedula: string; dactilar: string },
  ): Promise<any> {
    const { cedula, dactilar } = body;

    try {
      // Iniciar la consulta dactilar
      const ciudadanoGuardado = await this.ciudadanoService.consultarDactilar(
        cedula,
        dactilar,
      );

      if (!ciudadanoGuardado) {
        throw new HttpException(
          'No se pudo encontrar ni guardar los datos del ciudadano',
          HttpStatus.NOT_FOUND,
        );
      }

      // Respuesta exitosa
      return {
        statusCode: HttpStatus.OK,
        message: 'Consulta dactilar realizada con éxito',
        data: ciudadanoGuardado,
      };
    } catch (error) {
      // Capturar el error y devolver un mensaje apropiado
      console.error('Error en la consulta dactilar:', error.message);

      if (error instanceof HttpException) {
        throw error; // Lanzar la excepción HTTP si es un HttpException
      }

      throw new HttpException(
        'Error interno en la consulta dactilar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard) 
  @Get()
  async obtenerTodos(
    @Query('NOMBRE') NOMBRE?: string,
    @Query('NUI') NUI?: string,
  ): Promise<any> {
    try {
      const queryParams = {
        NOMBRE,
        NUI,
      };

      const ciudadanos = await this.ciudadanoService.obtenerTodos(queryParams);

      if (!ciudadanos || ciudadanos.length === 0) {
        // Maneja el caso en que no se encuentran ciudadanos
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron ciudadanos',
        }, HttpStatus.NOT_FOUND);
      }

      // Respuesta exitosa
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudadanos obtenidos exitosamente',
        data: ciudadanos,
      };
    } catch (error) {
      console.error('Error al obtener todos los ciudadanos:', error.message);

      // Maneja los errores internos del servidor
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno al obtener los ciudadanos',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cedula')
  async findByNUI(@Param('cedula') cedula: string): Promise<any> {
    try {
      const ciudadano = await this.ciudadanoService.findByNUI(cedula);

      if (!ciudadano) {
        throw new HttpException(
          `No se encontró un ciudadano con la cédula ${cedula}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Respuesta exitosa
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudadano encontrado',
        data: ciudadano,
      };
    } catch (error) {
      console.error(
        error.message,
      );

      throw new HttpException(
        'Error interno al buscar el ciudadano',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
