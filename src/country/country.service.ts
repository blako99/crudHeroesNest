import { Injectable, Req } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './interfaces/country.interface';
import { CreateCountryDTO } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country') private readonly countryModel: Model<Country>,
  ) {}

  async getCountries(): Promise<Country[]> {
    const countries = await this.countryModel.find();
    return countries;
  }
  async getCountry(countryID: string): Promise<Country> {
    const country = await this.countryModel.findById(countryID);
    return country;
  }
  async createCountry(createCountryDTO: CreateCountryDTO): Promise<Country> {
    //Creamos el objeto que vamos a guardar
    const country = new this.countryModel(createCountryDTO);
    await country.save(); //lo guardamos
    return country;
  }
  async deleteCountry(countryID: string): Promise<Country> {
    const deletedcountry = await this.countryModel.findByIdAndDelete(countryID);
    return deletedcountry;
  }

  async updateCountry(
    countryID: string,
    createCountryDTO: CreateCountryDTO,
  ): Promise<Country> {
    const countryupdated = await this.countryModel.findByIdAndUpdate(
      countryID,
      createCountryDTO,
      { new: true },
    );
    return countryupdated;
  }
}
