import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Cliente } from './entities/client.entity';
import { Vendedor } from './entities/vendedor.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Cliente, Vendedor, Admin]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
