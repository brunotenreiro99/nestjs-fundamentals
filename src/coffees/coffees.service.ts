import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coffee } from './entities/flavor.entity.ts/coffee.entity';
import { Model } from 'mongoose';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/create-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
    const { offset, limit } = paginationQueryDto;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    if (!coffee) {
      throw new NotFoundException();
    }

    return coffee;
  }

  create(createCoffeDto: CreateCoffeDto) {
    const coffee = new this.coffeeModel(createCoffeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate(
        { _id: id }, // find query
        { $set: updateCoffeeDto }, // mongoose update query object
        { new: true }, // return the update coffee data, by default its false and returns the old
      )
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException();
    }

    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    await coffee.deleteOne();
  }
}
