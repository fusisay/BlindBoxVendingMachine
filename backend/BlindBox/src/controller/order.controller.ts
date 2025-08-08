import { Controller, Post, Put, Param, Body, Inject, Get } from '@midwayjs/decorator';
import { OrderService } from '../service/order.service';
import { ApiTags, ApiOperation } from '@midwayjs/swagger';
import { OrderDTO } from '../interface/order.dto';
import { UpdateOrderStatusDto } from '../interface/order.dto';


@ApiTags('订单模块')
@Controller('/api/orders')
export class OrderController {
  @Inject()
  orderService: OrderService;

  // ✅ 创建订单
  @Post('/')    
    @ApiOperation({ summary: '创建订单' })
  async createOrder(@Body() body: OrderDTO) {
    return await this.orderService.createOrder(body);
  }

  // ✅ 修改订单状态
  @Put('/:orderId/status')
  @ApiOperation({ summary: '修改订单状态' })
  async updateStatus(
    @Param('orderId') orderId: number,
    @Body() body: UpdateOrderStatusDto
  ) {
    return await this.orderService.updateOrderStatus(orderId, body.status);
  }

  @Get('/get')
  @ApiOperation({ summary: '获取订单列表' })
  async getOrders(@Param('userId') userId: number) {
    return await this.orderService.getOrders(userId);
}

}
