import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class AppService {
  private products: Product[] = [];

  getAll(): Product[] {
    console.log('GET ALL... \n', this.products, '\n');
    
    return this.products;
  }

  getById(id: number): Product {
    const product = this.products.find((value) => value.id == id);

    console.log('GET ONE... \n', product, '\n');
    
    return product;
  }

  create(product: Product) {
    let lastId = this.products.length > 0 ? this.products.length : 0;

    product.id = lastId + 1;
    product.available_status ? true : false;

    this.products.push(product);
    console.log('CREATE... \n', product, '\n');
    
    return product;
  }

  update(product: Product) {
    console.log('UPDATE... \n', product, '\n');
    const productArray = this.getById(product.id);
    
    if (productArray) {
      productArray.id = product.id;
      productArray.name = product.name;
      productArray.available_status = product.available_status;
      productArray.destination = product.destination;
      productArray.profitability_rate = product.profitability_rate;
      productArray.minimum_deadline = product.minimum_deadline;
      productArray.administration_rate = product.administration_rate;
    }

    return productArray;
  }

  delete(id: number) {
    const index = this.products.findIndex((value) => value.id == id);
    this.products.splice(index, 1);
  }
}
