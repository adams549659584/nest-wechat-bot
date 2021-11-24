import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WechatModule } from './wechat/wechat.module';

@Module({
  imports: [WechatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
