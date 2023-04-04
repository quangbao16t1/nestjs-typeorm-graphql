import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { common_const } from './share/common/app.const';
import { TransformInterceptor } from './share/intereceptor/transform.interceptor';
import { ValidationPipe } from './share/pipe/validation.pipe';
import { HttpExceptionFilter } from './share/filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
      .setTitle('Backend API Swagger')
      .setDescription('This is a detail specification of API Swagger')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer('/api/v1')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);

  app.setGlobalPrefix(common_const.API_PREFIX);
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
