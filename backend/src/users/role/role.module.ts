import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUserEntity } from 'src/entity/pg/user/role.entity';
import { UserEntity } from 'src/entity/pg/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleUserEntity,
      UserEntity
    ]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule { }
