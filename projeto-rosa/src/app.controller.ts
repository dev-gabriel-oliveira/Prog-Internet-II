import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHome(): void {}

  @Get('/products')
  @Render('products')
  async getAll(): Promise<Product[]> {
    return this.appService.getAll();
  }

  @Get('/products/create') // Rota para página de criação
  @Render('create-product')
  getCreateProductPage(): void {} // Esse método não precisa retornar nada, apenas renderiza a página

  @Post('/products/create') // Rota para receber o formulário de criação
  async create(@Body() product: Product): Promise<Product> {
    return this.appService.create(product);
  }

  @Get('/products/:id')
  @Render('product-detail')
  async getById(@Param('id') id: number): Promise<Product> {
    return this.appService.getById(id);
  }

  @Get('/products/:id/edit') // Rota para página de edição
  @Render('update-product')
  async getUpdateProductPage(@Param('id') id: number): Promise<Product> {
    return this.appService.getById(id);
  }

  @Put('/products/:id/update') // Rota para receber o formulário de edição
  async update(@Param('id') id: number, @Body() product: Product): Promise<Product> {
    product.id = id;
    return this.appService.update(product);
  }

  @Get('/products/:id/delete') // Rota para página de exclusão
  @Render('delete-product')
  async getDeleteProductPage(@Param('id') id: number): Promise<Product> {
    return this.appService.getById(id);
  }

  @Delete('/products/:id/delete') // Rota para receber a confirmação de exclusão
  async delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }
}
