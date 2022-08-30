import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './common/pipe';
import { PrismaService } from './database/prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const PORT = config.get('PORT');

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await prismaService.enableShutdownHooks(app);
  await app.listen(PORT).then(() => {
    logger.log(`server running at http://localhost:${PORT}`);
  });
}
bootstrap();
