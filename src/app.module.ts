import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './modules/countries/countries.module';
import { Holiday } from './entities/holiday.entity';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { HolidaysModule } from './modules/holidays/holidays.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: String(configService.get<string>('DB_PASSWORD')),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    HttpModule,
    CountriesModule,
    UsersModule,
    HolidaysModule,
    TypeOrmModule.forFeature([User, Holiday]),
  ],
})
export class AppModule {}
