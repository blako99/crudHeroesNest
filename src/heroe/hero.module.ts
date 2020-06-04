import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSchema } from './schemas/hero.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'hero', schema: HeroSchema }])],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
