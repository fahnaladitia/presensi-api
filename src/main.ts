import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './v1/pipe';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('PORT');

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(PORT).then(() => {
    logger.log(`server running at http://localhost:${PORT}`);
  });
}
bootstrap();
