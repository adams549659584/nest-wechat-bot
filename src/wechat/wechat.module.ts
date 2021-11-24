import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { WechatController } from './wechat.controller';

@Module({
  controllers: [WechatController],
  providers: [WechatService]
})
export class WechatModule {}
