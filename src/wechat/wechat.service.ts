import { Injectable } from '@nestjs/common';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';
import { Contact, Message, ScanStatus, WechatyBuilder, log } from 'wechaty';
import { WechatyInterface } from 'wechaty/impls';

// const BOT_LIST: {
//   [key in string]: WechatyInterface;
// } = {};

const BOT_MAP = new Map<string, WechatyInterface>();

@Injectable()
export class WechatService {
  create(createWechatDto: CreateWechatDto) {
    if (BOT_MAP.has(createWechatDto.name)) {
      return '机器人早已启动啦！';
    } else {
      const bot = WechatyBuilder.build({
        name: createWechatDto.name,
        puppet: 'wechaty-puppet-wechat',
      });
      bot.on('login', async user => {
        console.log(user.name());
      });
      bot.start();
      BOT_MAP.set(createWechatDto.name, bot);
      return '机器人启动啦！';
    }
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
