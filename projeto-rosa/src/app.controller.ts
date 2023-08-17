import { Body, Controller, Delete, Get, Param, Post, Put, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHome(): void {}

  // Get All
  @Get('/products')
  @Render('products')
  getAll() {
    const products = this.appService.getAll(); 
    const context = { products }; 
    return context;
  }

  // Get One
  @Get('/products/:id/detail')
  @Render('detail-product')
  getById(@Param('id') id: number) {
    const product = this.appService.getById(id); 

    return product;
  }

  // Create Page
  @Get('/products/create')
  @Render('create-product')
  getCreateProductPage(): void {}

  // Create Method
  @Post('/products/create')
  create(@Res() res: any, @Body() product: Product) {
    this.appService.create(product);
    return res.redirect(`/products`);
  }


  // Update Page
  @Get('/products/:id/update') // Rota para página de edição
  @Render('update-product')
  async getUpdateProductPage(@Param('id') id: number) {
    const product = this.appService.getById(id); 

    return product;
  }

  // Update Method
  @Put('/products/:id/update') // Rota para receber o formulário de edição
  async update(@Res() res: any, @Param('id') id: number, @Body() product: Product) {
    product.id = id;
    this.appService.update(product);
    return res.redirect(`/products`);
  }


  // Delete Page
  /*@Get('/products/:id/delete') // Rota para página de exclusão
  @Render('delete-product')
  async getDeleteProductPage(@Param('id') id: number): Promise<Product> {
    return this.appService.getById(id);
  }

  // Delete Method
  @Delete('/products/:id/delete') // Rota para receber a confirmação de exclusão
  async delete(@Param('id') id: number) {
    return this.appService.delete(id);
  }*/
}
