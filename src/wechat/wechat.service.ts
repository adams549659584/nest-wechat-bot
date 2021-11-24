import { Injectable } from '@nestjs/common';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';

@Injectable()
export class WechatService {
  create(createWechatDto: CreateWechatDto) {
    return 'This action adds a new wechat';
  }

  findAll() {
    return `This action returns all wechat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wechat`;
  }

  update(id: number, updateWechatDto: UpdateWechatDto) {
    return `This action updates a #${id} wechat`;
  }

  remove(id: number) {
    return `This action removes a #${id} wechat`;
  }
}
