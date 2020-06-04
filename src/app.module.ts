import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './heroe/hero.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
@Module({
  imports: [HeroModule, MongooseModule.forRoot('mongodb://localhost/heros'), CountryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
