import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeDto } from 'src/coffees/dto/create-coffe.dto/create-coffe.dto';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true, // make sure to disable on production
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

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

    await app.init();
  });

  it('Create [POST /]', async () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeDto)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            ...coffee,
            flavors: expect.any(Array),
          }),
        );
      });
  });
  it.todo('Get One [GET /]');
  it.todo('Get All [GET /]');
  it.todo('Update [PATCH /]');
  it.todo('Delete [DELETE /]');

  afterAll(async () => {
    await app.close();
  });
});
