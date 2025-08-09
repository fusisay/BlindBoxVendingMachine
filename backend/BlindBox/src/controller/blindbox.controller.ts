import { Controller, Post, Del, Get, Param, Body, Inject, Query } from '@midwayjs/decorator';
import { BlindBoxService } from '../service/blindbox.service';
import { ApiTags, ApiOperation } from '@midwayjs/swagger';
import { BlindBoxDTO } from '../interface/product.dto';


@ApiTags('盲盒模块')
@Controller('/api/blindboxes')
export class BlindBoxController {
  @Inject()
  blindBoxService: BlindBoxService;

  // 创建盲盒
  @Post('/')
    @ApiOperation({ summary: '创建盲盒' })
  async create(@Body() body: BlindBoxDTO) {
    return await this.blindBoxService.createBlindBox(body);
  }

  // 删除盲盒
  @Del('/:id')
  @ApiOperation({ summary: '删除盲盒' })
  async delete(@Param('id') id: number) {
    return await this.blindBoxService.deleteBlindBox(id);
  }

  // 获取所有盲盒（含商品）
  @Get('/')
    @ApiOperation({ summary: '获取所有盲盒' })
  async getAll() {
    return await this.blindBoxService.getAllBlindBoxes();
  }

  // 获取单个盲盒详情
  @Get('/:id')
    @ApiOperation({ summary: '获取单个盲盒详情' })
  async getById(@Param('id') id: number) {
    return await this.blindBoxService.getBlindBoxById(id);
  }

  // 添加商品到盲盒
  @Post('/:blindBoxId/add-product/:productId')
    @ApiOperation({ summary: '添加商品到盲盒' })
  async addProduct(
    @Param('blindBoxId') blindBoxId: number,
    @Param('productId') productId: number
  ) {
    return await this.blindBoxService.addProductToBlindBox(blindBoxId, productId);
  }

  // 从盲盒中移除商品
  @Del('/:blindBoxId/remove-product/:productId')
    @ApiOperation({ summary: '从盲盒中移除商品' })
  async removeProduct(
    @Param('blindBoxId') blindBoxId: number,
    @Param('productId') productId: number
  ) {
    return await this.blindBoxService.removeProductFromBlindBox(blindBoxId, productId);
  }

  // 搜索盲盒
  @Get('/search')
  @ApiOperation({ summary: '搜索盲盒' })
  async search(@Query('keyword') keyword: string) {
    return await this.blindBoxService.searchBlindBoxes(keyword);
  }
}

