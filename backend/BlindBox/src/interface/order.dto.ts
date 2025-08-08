import { ApiProperty } from "@midwayjs/swagger";
import { IsEnum } from "class-validator";
import { OrderStatus } from "../entity/Order";

export class OrderDTO {
  @ApiProperty({ description: '用户ID' })
  userId: number;
    @ApiProperty({ description: '商品ID' })
    productId: number;
}


export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, { message: '订单状态不合法' })
  status: OrderStatus;
}
