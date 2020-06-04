export class CreateHeroDTO {
  readonly name: string;
  readonly type: { type: string; enum: ['aire', 'fuego', 'agua', 'tierra'] };
  readonly rol: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

//pais
