import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { BlindBox } from '../entity/BlindBox';
import { Product } from '../entity/Product';
import { BlindBoxDTO } from '../interface/product.dto';

@Provide()
export class BlindBoxService {
  @InjectEntityModel(BlindBox)
  blindBoxRepo: Repository<BlindBox>;

  @InjectEntityModel(Product)
  productRepo: Repository<Product>;

  // 创建盲盒
  async createBlindBox(data: BlindBoxDTO) {
    const blindBox = this.blindBoxRepo.create(data);
    return await this.blindBoxRepo.save(blindBox);
  }

  // 删除盲盒
  async deleteBlindBox(id: number) {
    return await this.blindBoxRepo.delete({ blindBoxId: id });
  }

  // 获取所有盲盒（含商品）
  async getAllBlindBoxes() {
    return await this.blindBoxRepo.find({
      relations: ['products'],
    });
  }

  // 获取单个盲盒详情
  async getBlindBoxById(id: number) {
    return await this.blindBoxRepo.findOne({
      where: { blindBoxId: id },
      relations: ['products'],
    });
  }

  // 绑定商品到盲盒
  async addProductToBlindBox(blindBoxId: number, productId: number) {
    const blindBox = await this.blindBoxRepo.findOne({
      where: { blindBoxId },
      relations: ['products'],
    });
    const product = await this.productRepo.findOneBy({ productId });

    if (!blindBox || !product) {
      throw new Error('盲盒或商品不存在');
    }

    const alreadyAdded = blindBox.products.find(p => p.productId === productId);
    if (!alreadyAdded) {
      blindBox.products.push(product);
      return await this.blindBoxRepo.save(blindBox);
    }

    return blindBox;
  }

  // 从盲盒中移除商品
  async removeProductFromBlindBox(blindBoxId: number, productId: number) {
    const blindBox = await this.blindBoxRepo.findOne({
      where: { blindBoxId },
      relations: ['products'],
    });

    if (!blindBox) {
      throw new Error('盲盒不存在');
    }

    blindBox.products = blindBox.products.filter(p => p.productId !== productId);
    return await this.blindBoxRepo.save(blindBox);
  }
}
