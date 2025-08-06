import { ApiProperty } from '@midwayjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: '商品名称' })
  productName: string;

  @ApiProperty({ description: '商品描述' })
  productDescription: string;

  @ApiProperty({ description: '商品价格' })
  productPrice: number;

  @ApiProperty({ description: '商品图片URL' })
  productImgUrl: string;

  @ApiProperty({ description: '商品库存' })
  productStock: number;
}


export class BlindBoxDTO {
  @ApiProperty({ description: '盲盒名称' })
  blindBoxName: string;

  @ApiProperty({ description: '盲盒描述' })
  blindBoxDescription: string;

  @ApiProperty({ description: '盲盒图片URL' })
  blindBoxImgUrl: string;
  
  @ApiProperty({ description: '盲盒价格' })
  blindBoxPrice: number;

}
