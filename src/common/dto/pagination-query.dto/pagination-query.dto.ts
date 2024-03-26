import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  // @Type(() => Number) // parsing the value to a number, its commented because now we added implict conversions that already does that
  @IsPositive()
  limit: number;

  @IsOptional()
  // @Type(() => Number) // parsing the value to a number
  @IsPositive()
  offset: number;
}
