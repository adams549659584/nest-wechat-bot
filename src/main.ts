import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = app => {
  const options = new DocumentBuilder().setTitle('微信机器人').setDescription('nest-wechat-bot 的 API 文档').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
