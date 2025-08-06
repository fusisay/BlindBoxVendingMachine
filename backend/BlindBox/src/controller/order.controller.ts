import { Controller, Post, Put, Param, Body } from '@midwayjs/decorator';
import { OrderService } from '../service/order.service';
import { OrderStatus } from '../entity/Order';
import { ApiTags, ApiOperation } from '@midwayjs/swagger';


@ApiTags('订单模块')
@Controller('/api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // ✅ 创建订单
  @Post('/')    
    @ApiOperation({ summary: '创建订单' })
  async createOrder(
    @Body() body: { userId: number; productId: number }
  ) {
    return await this.orderService.createOrder(body);
  }

  // ✅ 修改订单状态
  @Put('/:orderId/status')
  @ApiOperation({ summary: '修改订单状态' })
  async updateStatus(
    @Param('orderId') orderId: number,
    @Body() body: { status: OrderStatus }
  ) {
    return await this.orderService.updateOrderStatus(orderId, body.status);
  }
}
