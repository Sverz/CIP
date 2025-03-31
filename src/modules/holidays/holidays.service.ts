import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../../entities/holiday.entity';

@Injectable()
export class HolidaysService {
  private readonly nagerApiUrl = 'https://date.nager.at/api/v3';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Holiday) private readonly holidayRepository: Repository<Holiday>,
  ) {}

  async addHolidaysToUser(userId: number, countryCode: string, year: number, holidays: string[]) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.nagerApiUrl}/PublicHolidays/${year}/${countryCode}`),
    );
    const allHolidays = response.data;

    const filteredHolidays = holidays.length
      ? allHolidays.filter((h) => holidays.includes(h.localName))
      : allHolidays;

    const holidayEntities = filteredHolidays.map((h) =>
      this.holidayRepository.create({
        countryCode,
        year,
        name: h.localName,
        user: { id: userId },
      }),
    );

    return this.holidayRepository.save(holidayEntities);
  }
}
