import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { CreateProductDTO } from '../interface/product.dto';

@Provide()
export class ProductService {

  @InjectEntityModel(Product)
  productModel: Repository<Product>;

  // 创建商品
  async createProduct(data: CreateProductDTO) {
    const product = this.productModel.create(data);
    return await this.productModel.save(product);
  }

  // 获取所有商品
  async getAllProducts() {
    return await this.productModel.find();
  }

  // 获取单个商品
  async getProductById(id: number) {
    return await this.productModel.findOneBy({ productId: id });
  }

  // 更新商品
  async updateProduct(id: number, data: CreateProductDTO) {
    await this.productModel.update({ productId: id }, data);
    return this.getProductById(id);
  }

  // 删除商品
  async deleteProduct(id: number) {
    return await this.productModel.delete({ productId: id });
  }
}
