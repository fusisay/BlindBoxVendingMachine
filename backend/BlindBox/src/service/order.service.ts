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

    // 检查是否已有相同用户和商品的待处理订单
  const existingOrder = await this.orderRepo.findOne({
    where: {
      user: { id: userId },
      product: { productId },
      orderStatus: OrderStatus.PENDING,
    },
    relations: ['user', 'product'],
  });

  if (existingOrder) {
    existingOrder.quantity += 1;
    return await this.orderRepo.save(existingOrder);
  }

    const order = this.orderRepo.create({
      user,
      product,
      quantity: 1,
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

  async getOrders(userId: number) {
    return await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'product'],
      order: { createdAt: 'DESC' },
    });
  }
}
