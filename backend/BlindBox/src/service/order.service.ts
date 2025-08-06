import { InjectEntityModel } from '@midwayjs/typeorm';
import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entity/Order';
import { User } from '../entity/User';
import { Product } from '../entity/Product';

@Provide()
export class OrderService {
  @InjectEntityModel(Order)
  orderRepo: Repository<Order>;

  @InjectEntityModel(User)
  userRepo: Repository<User>;

  @InjectEntityModel(Product)
  productRepo: Repository<Product>;

  // ✅ 创建订单
  async createOrder(data: { userId: number; productId: number }) {
    const { userId, productId } = data;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('用户不存在');

    const product = await this.productRepo.findOneBy({ productId });
    if (!product) throw new Error('商品不存在');

    const order = this.orderRepo.create({
      user,
      product,
      orderStatus: OrderStatus.PENDING,
    });

    return await this.orderRepo.save(order);
  }

  // ✅ 修改订单状态
  async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.orderRepo.findOneBy({ orderId });
    if (!order) throw new Error('订单不存在');

    order.orderStatus = status;
    return await this.orderRepo.save(order);
  }
}
