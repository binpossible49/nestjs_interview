import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useBodyParser('json', { limit: '10mb' });
  const config = new DocumentBuilder()
    .setTitle('Building management')
    .setDescription('The Building management API description')
    .setVersion('1.0')
    .addTag('building')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
  await app.listen(3000);
}
bootstrap();
