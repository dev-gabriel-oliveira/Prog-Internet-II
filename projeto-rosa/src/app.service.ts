import { Injectable } from '@nestjs/common';
import { Product } from './models';

@Injectable()
export class AppService {
  products: Product[] = [];

  getAll() {
    return this.products;
  }

  getById(id: number) {
    const product = this.products.find((value) => (value.id = id));
    return product;
  }

  create(product: Product) {
    let lastId = this.products.length;

    product.id = lastId + 1;
    this.products.push(product);

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
