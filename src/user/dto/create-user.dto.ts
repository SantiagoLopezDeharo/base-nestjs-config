import { IsString } from 'class-validator';
import { Model } from 'sequelize-typescript';

export class CreateUserDto extends Model {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
