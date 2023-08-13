// src/types.ts
export interface RegistroIMC {
    nome: string;
    imc: number;
  }
  
export interface CalcularIMCInput {
    nome: string;
    peso: number;
    altura: number;
}
