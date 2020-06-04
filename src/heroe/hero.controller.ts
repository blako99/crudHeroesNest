import { CreateHeroDTO } from './dto/hero.dto';
import { HeroService } from './hero.service';
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

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}
  @Post('/create')
  async createHero(@Res() res, @Body() createHeroDTO: CreateHeroDTO) {
    const hero = await this.heroService.createHero(createHeroDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Heroe guardado correctamente',
      hero,
    });
  }

  @Get('/')
  async getHeros(@Res() res) {
    const heros = await this.heroService.getHeros();
    return res.status(HttpStatus.OK).json({
      message: 'Heroes',
      heros,
    });
  }

  @Get('/:heroID')
  async getHero(@Param('heroID') heroID, @Res() res) {
    const hero = await this.heroService.getHero(heroID);
    //  if (!product) throw new NotFoundException('Producto no encontrado');

    return res.status(HttpStatus.OK).json(hero);
  }
  @Delete('/delete/:heroID')
  async deleteHero(@Param('heroID') heroID, @Res() res) {
    const deletedhero = await this.heroService.deleteHero(heroID);
    if (!deletedhero)
      throw new NotFoundException('El heroe que desea eliminar no existe');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Heroe eliminado correctamente', deletedhero });
  }
  @Put('/update/:heroID')
  async updatedHero(
    @Param('heroID') heroID,
    @Res() res,
    @Body() createHeroDTO: CreateHeroDTO,
  ) {
    const updatedhero = await this.heroService.updateHero(
      heroID,
      createHeroDTO,
    );
    //throw new NotFoundException('El producto que desea actualizar no existe');

    res
      .status(HttpStatus.OK)
      .json({ message: 'Heroe actualizado', updatedhero });
  }
}
