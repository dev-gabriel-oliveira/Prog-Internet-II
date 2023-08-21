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
  @Get('/list-products')
  @Render('products/list-products')
  getAll() {
    const products = this.appService.getAll(); 
    const context = { products }; 
    return context;
  }

  // Get One
  @Get('/detail-product-:id')
  @Render('products/detail-product')
  getById(@Param('id') id: number) {
    const product = this.appService.getById(id);
    return product;
  }

  // Create Page
  @Get('/create-product')
  @Render('products/create-product')
  getCreateProductPage(): void {}

  // Create Method
  @Post('/products/create')
  create(@Res() res: any, @Body() product: Product) {
    this.appService.create(product);
    return res.redirect(`/list-products`);
  }


  // Update Page
  /*@Get('/update-product-:id') // Rota para página de edição
  @Render('update-product')
  getUpdateProductPage(@Param('id') id: number) {
    const product = this.appService.getById(id); 

    return product;
  }*/

  // Update Method
  @Get('/products/:id/update') // Rota para receber o formulário de edição
  update(@Res() res: any, @Param('id') id: number) {
    this.appService.update(id);
    return res.redirect(`/list-products`);
  }


  // Delete Page
  @Get('/delete-product-:id') // Rota para página de exclusão
  @Render('products/delete-product')
  async getDeleteProductPage(@Param('id') id: number) {
    const product = this.appService.getById(id);
    return product;
  }

  // Delete Method
  @Get('/products/:id/delete') // Rota para receber a confirmação de exclusão
  delete(@Res() res: any, @Param('id') id: number) {
    this.appService.delete(id);
    return res.redirect(`/list-products`);
  }
}
