import { Injectable } from '@nestjs/common';
import { RegistroIMC, CalcularIMCInput } from './types'; 

@Injectable()
export class AppService {
  private registrosIMC: RegistroIMC[] = [];

  calcularIMC(input: CalcularIMCInput): number {
    const imc = input.peso / (input.altura * input.altura);
    this.registrosIMC.push({ nome: input.nome, imc });
    return imc;
  }

  obterRegistrosIMC(): RegistroIMC[] {
    return this.registrosIMC;
  }
}
