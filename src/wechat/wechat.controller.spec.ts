import { Test, TestingModule } from '@nestjs/testing';
import { WechatController } from './wechat.controller';
import { WechatService } from './wechat.service';

describe('WechatController', () => {
  let controller: WechatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WechatController],
      providers: [WechatService],
    }).compile();

    controller = module.get<WechatController>(WechatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
