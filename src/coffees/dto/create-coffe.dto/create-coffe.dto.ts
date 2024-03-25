import { IsString } from 'class-validator';

export class CreateCoffeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true }) // each true says that its an array of strings
  readonly flavors: string[];
}
