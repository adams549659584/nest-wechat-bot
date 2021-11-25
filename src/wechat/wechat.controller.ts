import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';
import { QRCodeWechatDto } from './dto/qrcode-wechat.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('微信')
@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}

  @ApiBody({
    description: '创建机器人',
    type: CreateWechatDto,
  })
  @Post()
  create(@Body() createWechatDto: CreateWechatDto) {
    return this.wechatService.create(createWechatDto);
  }

  @ApiBody({
    description: '获取登录二维码',
    type: QRCodeWechatDto,
  })
  @Post('/qrcode')
  qrcode(@Body() qrcodeWechatDto: QRCodeWechatDto) {
    return this.wechatService.qrcode(qrcodeWechatDto);
  }

  @ApiBody({
    description: '查询所有在线机器人',
  })
  @Get()
  findAll() {
    return this.wechatService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.wechatService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWechatDto: UpdateWechatDto) {
    return this.wechatService.update(+id, updateWechatDto);
  }

  @ApiBody({
    description: '移除单个机器人',
  })
  @Delete(':name')
  remove(@Param('name') remove: string) {
    return this.wechatService.remove(remove);
  }
}
