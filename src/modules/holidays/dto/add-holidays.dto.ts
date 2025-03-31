import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class AddHolidaysDto {
  @ApiProperty({ example: 'US', description: 'Код країни' })
  @IsString()
  countryCode: string;

  @ApiProperty({ example: 2025, description: 'Рік' })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: ['New Year`s Day', 'Independence Day'],
    description: 'Список свят',
  })
  @IsArray()
  holidays: string[];
}
