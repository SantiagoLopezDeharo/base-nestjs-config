import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDTO } from './dto/loginDTO';
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { PassHash } from '../common/utils/pass-hash';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly model: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDTO) {
    const user = await this.model.findOne({
      where: {
        username: body.username,
      },
      attributes: ['password'],
    });

    if (!user)
      throw new NotFoundException('No se encontro un usuario con ese mail.');

    if (!(await PassHash.compare(body.password, user.password)))
      throw new UnauthorizedException('Contraseña equivocada.');

    return await this.generateTokens(body);
  }

  async refresh(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<{
        username: string;
      }>(token, {
        secret: process.env.JWT_SECRET,
      });

      return await this.generateTokens(decoded);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async generateTokens(user: {
    username: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }
}
