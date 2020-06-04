import { CreateCountryDTO } from './dto/country.dto';
import { CountryService } from './country.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  NotFoundException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { query } from 'express';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @Post('/create')
  async createCountry(@Res() res, @Body() createCountryDTO: CreateCountryDTO) {
    const country = await this.countryService.createCountry(createCountryDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Pais guardado correctamente',
      country,
    });
  }

  @Get('/')
  async getCountries(@Res() res) {
    const countries = await this.countryService.getCountries();
    return res.status(HttpStatus.OK).json({
      message: 'Paises',
      countries,
    });
  }

  @Get('/:countryID')
  async getCountry(@Param('countryID') countryID, @Res() res) {
    const country = await this.countryService.getCountry(countryID);
    //  if (!product) throw new NotFoundException('Producto no encontrado');

    return res.status(HttpStatus.OK).json(country);
  }
  @Delete('/delete/:countryID')
  async deleteCountry(@Param('countryID') countryID, @Res() res) {
    const deletedcountry = await this.countryService.deleteCountry(countryID);
    if (!deletedcountry)
      throw new NotFoundException('El pais que desea eliminar no existe');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Pais eliminado correctamente', deletedcountry });
  }
  @Put('/update/:countryID')
  async updatedCountry(
    @Param('countryID') countryID,
    @Res() res,
    @Body() createCountryDTO: CreateCountryDTO,
  ) {
    const updatedcountry = await this.countryService.updateCountry(
      countryID,
      createCountryDTO,
    );
    //throw new NotFoundException('El producto que desea actualizar no existe');

    res
      .status(HttpStatus.OK)
      .json({ message: 'Pais actualizado', updatedcountry });
  }
}
