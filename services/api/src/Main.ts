import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/module/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // @TODO: investigate why CLassSerializerInterceptor is throwing
  //        rxjs errors
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector)),
  // );

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
