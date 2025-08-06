import { Controller, Get, Post, Put, Del, Param, Body, Inject, Provide } from '@midwayjs/decorator';
import { ProductService } from '../service/product.service';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { CreateProductDTO } from '../interface/product.dto';

@Provide()
@ApiTags('商品模块')
@Controller('/api/products')
export class ProductController {


  @Inject()
  productService: ProductService;

  @Post('/')
  @ApiOperation({ summary: '创建商品' })
  async create(@Body() body: CreateProductDTO) {
    return await this.productService.createProduct(body);
  }

  @Get('/')
  @ApiOperation({ summary: '获取所有商品' })
  async list() {
    return await this.productService.getAllProducts();
  }

  @Get('/:id')
  @ApiOperation({ summary: '获取单个商品' })
  async getById(@Param('id') id: number) {
    return await this.productService.getProductById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: '更新商品' })
  async update(@Param('id') id: number, @Body() body: CreateProductDTO) {
    return await this.productService.updateProduct(id, body);
  }

  @Del('/:id')
  @ApiOperation({ summary: '删除商品' })
  async delete(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}
