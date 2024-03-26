import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // this check for unwanted proprieties and removes them from the request data
      transform: true, // transforms data of the request to be an instance of the given type ex: createTask: CreateTaskDto will now be an instance of CreateTaskDto. The same for for example converting a param to a number: id: number will be a number without using PipeToInt
      forbidNonWhitelisted: true, // this stops a requested if unwanted proprities are sent in the request
      transformOptions: {
        enableImplicitConversion: true, // allows to convert directly to the assigned type in a class
      },
    }),
  );
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
