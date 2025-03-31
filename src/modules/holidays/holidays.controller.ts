import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HolidaysService } from './holidays.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';

@ApiTags('Holidays')
@Controller('users/:userId/calendar/holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @ApiOperation({ summary: 'Додати свята у календар користувача' })
  @Post()
  async addHolidaysToUser(@Param('userId') userId: number, @Body() addHolidaysDto: AddHolidaysDto) {
    return this.holidaysService.addHolidaysToUser(
      userId,
      addHolidaysDto.countryCode,
      addHolidaysDto.year,
      addHolidaysDto.holidays,
    );
  }
}
