import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class AppService {
  private products: Product[] = [];

  getAll(): Product[] {
    console.log('GET ALL - ', this.products);
    
    return this.products;
  }

  getById(id: number): Product {
    const product = this.products.find((value) => (value.id = id));

    console.log(product, ` - id ${id}`);
    
    return product;
  }

  create(product: Product) {
    let lastId = this.products.length > 0 ? this.products.length : 0;

    product.id = lastId + 1;
    this.products.push(product);
    console.log('CREATE - ',this.products);
    
    return product;
  }

  update(product: Product) {
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
