import { Injectable, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './interfaces/hero.interface.';
import { CreateHeroDTO } from './dto/hero.dto';

@Injectable()
export class HeroService {
  constructor(@InjectModel('hero') private readonly heroModel: Model<Hero>) {}

  async getHeros(): Promise<Hero[]> {
    const heros = await this.heroModel.find();
    return heros;
  }
  async getHero(heroID: string): Promise<Hero> {
    const hero = await this.heroModel.findById(heroID);
    return hero;
  }
  async createHero(createHeroDTO: CreateHeroDTO): Promise<Hero> {
    //Creamos el objeto que vamos a guardar
    const hero = new this.heroModel(createHeroDTO);
    await hero.save(); //lo guardamos
    return hero;
  }
  async deleteHero(heroID: string): Promise<Hero> {
    const deletedhero = await this.heroModel.findByIdAndDelete(heroID);
    return deletedhero;
  }

  async updateHero(
    heroID: string,
    createHeroDTO: CreateHeroDTO,
  ): Promise<Hero> {
    const heroupdated = await this.heroModel.findByIdAndUpdate(
      heroID,
      createHeroDTO,
      { new: true },
    );
    return heroupdated;
  }
}
