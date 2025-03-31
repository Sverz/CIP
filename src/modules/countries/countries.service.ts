import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  private readonly nagerApiUrl = 'https://date.nager.at/api/v3';
  private readonly countriesnowApiUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.nagerApiUrl}/AvailableCountries`),
    );
    return response.data;
  }

  async getCountryInfo(countryCode: string) {
    try {
      const { data: countryInfo } = await firstValueFrom(
        this.httpService.get(`${this.nagerApiUrl}/CountryInfo/${countryCode}`),
      );

      const { data: populationData } = await firstValueFrom(
        this.httpService.post(`${this.countriesnowApiUrl}/population`, {
          country: countryInfo.commonName,
        }),
      );

      const { data: flagData } = await firstValueFrom(
        this.httpService.post(`${this.countriesnowApiUrl}/flag/images`, {
          country: countryInfo.commonName,
        }),
      );

      return {
        country: countryInfo.commonName,
        borders: countryInfo.borders || [],
        populationHistory: populationData.data.populationCounts || [],
        flagUrl: flagData.data.flag || null,
      };
    } catch (error) {
      throw new HttpException('Error fetching country data', HttpStatus.BAD_REQUEST);
    }
  }
}
