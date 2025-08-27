import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationResultDto } from 'src/common/dto/paginationResult.dto';
import { getPaginationResultFromModel } from 'src/common/utils/pagination';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly model: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    const validation = await this.model.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    // If a user with this username already exists we terminate
    if (validation)
      throw new HttpException(
        'Ya existe un usuario con ese nombre',
        HttpStatus.CONFLICT,
      );

    // We hash the plain password for storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Replace plain password with hashed password
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };

    await this.model.create(userToCreate);
  }

  async findAll(pagination: PaginationDto): Promise<PaginationResultDto<User>> {
    const users = await this.model.findAndCountAll({
      limit: pagination.size,
      offset: pagination.getOffset(),
    });

    return getPaginationResultFromModel(pagination, users);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
