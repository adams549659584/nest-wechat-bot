import { Injectable } from '@nestjs/common';
import { CreateWechatDto } from './dto/create-wechat.dto';
import { UpdateWechatDto } from './dto/update-wechat.dto';
import { Contact, Message, ScanStatus, WechatyBuilder, log } from 'wechaty';
import { WechatyInterface } from 'wechaty/impls';
import { QRCodeWechatDto } from './dto/qrcode-wechat.dto';
import HttpHelper from 'src/common/helpers/HttpHelper';
import { types as PuppetTypes } from 'wechaty-puppet';

const BOT_MAP = new Map<
  string,
  {
    qrcode?: string;
    bot?: WechatyInterface;
  }
>();

async function ownthinkBot(userid: string, msg: string) {
  const url = `https://api.ownthink.com/bot`;
  const body = {
    appid: '56e5c35584124862eb9da2a94f9d81d2',
    userid,
    spoken: msg,
  };
  const res = await HttpHelper.post<{
    message: string;
    data: {
      type: number;
      info: {
        text: string;
      };
    };
  }>(url, body);
  if (res.message === 'success' && res.data.type === 5000) {
    return res.data.info.text;
  } else {
    return res.message;
  }
}

function initBot(botName: string) {
  const botMap = BOT_MAP.get(botName);
  const { bot } = botMap;
  bot.on('scan', async (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcode);
      botMap.qrcode = qrcode;
    } else {
      log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
    }
  });
  bot.on('login', async user => {
    log.info('StarterBot', '%s login', user);
  });
  bot.on('message', async message => {
    log.info('StarterBot ', message.toString());
    if (!message.self() && message.type() === PuppetTypes.Message.Text) {
      const ownthinkUserId = encodeURIComponent(message.talker().id || message.talker().name() || '');
      const ownthinkBotResText = await ownthinkBot(ownthinkUserId, message.text());
      await message.say(ownthinkBotResText);
    }
  });
  return bot
    .start()
    .then(() => {
      log.info('StarterBot', 'Starter Bot Started.');
      return `机器人(${botName})启动啦！`;
    })
    .catch((e: Error) => {
      log.error('StarterBot', e);
      return `机器人(${botName})启动出错啦！~`;
    });
}

@Injectable()
export class WechatService {
  async create(createWechatDto: CreateWechatDto) {
    if (BOT_MAP.has(createWechatDto.name)) {
      return `机器人${createWechatDto.name}早已启动啦！~`;
    } else {
      const bot = WechatyBuilder.build({
        name: createWechatDto.name,
        puppet: 'wechaty-puppet-wechat',
      });
      BOT_MAP.set(createWechatDto.name, { bot });
      return await initBot(createWechatDto.name);
    }
  }

  qrcode(qrcodeWechatDto: QRCodeWechatDto) {
    const botMap = BOT_MAP.get(qrcodeWechatDto.name);
    return botMap && botMap.qrcode;
  }

  findAll() {
    const botNames = Array.from(BOT_MAP.keys());
    if (BOT_MAP.size > 0) {
      return `共有${botNames.length}个机器人在线，分别是：${botNames.join(',')}`;
    }
    return `暂时没有机器人在线啦！~`;
  }

  findOne(name: string) {
    if (BOT_MAP.has(name)) {
      return `机器人${name}在线哦！~`;
    }
    return `机器人${name}不在线呢！~`;
  }

  update(id: number, updateWechatDto: UpdateWechatDto) {
    return `This action updates a #${id} wechat`;
  }

  async remove(name: string) {
    if (BOT_MAP.has(name)) {
      const { bot } = BOT_MAP.get(name);
      BOT_MAP.delete(name);
      return await bot
        .stop()
        .then(() => {
          log.info('StoperBot', 'Starter Bot Stoped.');
          return `机器人(${name})已移除！~`;
        })
        .catch(e => {
          log.info('StoperBot', e);
          return `机器人(${name})移除出错啦！~`;
        });
    }
    return `机器人(${name})早就移除啦！~`;
  }
}
