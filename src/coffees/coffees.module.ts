import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/flavor.entity.ts/coffee.entity';
import { Flavor } from './entities/flavor.entity.ts/flavor.entity.ts';
import { Event } from 'src/events/entities/event.entity/event.entity';

class MockCoffeesService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  exports: [CoffeesService],
})
export class CoffeesModule {}
