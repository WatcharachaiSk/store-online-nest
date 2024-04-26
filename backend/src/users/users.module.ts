import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/pg/user/user.entity';
import { RoleModule } from './role/role.module';
import { RoleUserEntity } from 'src/entity/pg/user/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleUserEntity
    ]),
    RoleModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
