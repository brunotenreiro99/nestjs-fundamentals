import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _: ArgumentMetadata) {
    const val = parseInt(value);
    console.log(value);

    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer.`,
      );
    }

    return val;
  }
}
