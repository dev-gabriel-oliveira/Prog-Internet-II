import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class AppService {
  private products: Product[] = [];
  private nextId = 1; // ID Auto-Incrementável

  getAll(): Product[] {
    //console.log('GET ALL... \n', this.products, '\n');
    return this.products;
  }

  getById(id: number): Product {
    const product = this.products.find((value) => value.id == id);
    return product;
  }

  create(product: Product) {
    product.id = this.nextId++;
    product.profitability_rate = Number(product.profitability_rate); // Converte string para number
    product.minimum_deadline = Number(product.minimum_deadline); // Converte string para number
    product.administration_rate = Number(product.administration_rate); // Converte string para number

    this.products.push(product);
    
    return product;
  }

  update(id: number) {
    const product = this.getById(id);

    product.available_status = product.available_status == "Disponível" ? "Não Disponível" : "Disponível"; // Muda Status

    return product;
  }

  delete(id: number) {
    const index = this.products.findIndex((value) => value.id == id);
    this.products.splice(index, 1);
  }
}
