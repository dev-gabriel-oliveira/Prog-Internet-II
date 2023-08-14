import { Injectable } from '@nestjs/common';
import { RegistroIMC, CalcularIMCInput } from './types'; 

@Injectable()
export class AppService {
  private registrosIMC: RegistroIMC[] = [];

  calcularIMC(input: CalcularIMCInput): number {
    const imc_ = input.peso / (input.altura * input.altura);
    const imc = Number(imc_.toFixed(2));
    this.registrosIMC.push({ nome: input.nome, imc });
    return imc;
  }

  obterRegistrosIMC(): RegistroIMC[] {
    return this.registrosIMC;
  }
}
