import { Controller, Get, Post, Query, Render, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistroIMC, CalcularIMCInput } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  hello(@Query('nome') nome = 'Visitante') {
    const context = {
      nome,
      qtd_letras: nome.length,
    };
    return context;
  }

  @Get('form-imc')
  @Render('imc')
  formIMC(@Query('imc') imc: string) {
    const registros = this.appService.obterRegistrosIMC();
    const context = { imc, registros };
    return context;
  }

  @Post('calcular-imc')
  async calcularIMC(@Res() res: any, @Body() input: CalcularIMCInput) {
    const imc = this.appService.calcularIMC(input);
    await res.redirect(`/form-imc?imc=${imc}`);
  }
}
