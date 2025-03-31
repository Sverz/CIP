import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty({ example: 'UA', description: 'Код країни' })
  countryCode: string;

  @ApiProperty({ example: 'Ukraine', description: 'Назва країни' })
  name: string;
}
