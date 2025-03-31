import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from 'src/entities/holiday.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Holiday])],
  providers: [HolidaysService],
  controllers: [HolidaysController],
})
export class HolidaysModule {}
