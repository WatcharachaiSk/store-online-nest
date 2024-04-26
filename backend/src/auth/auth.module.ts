import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/jwtConstants';
import { UserEntity } from 'src/entity/pg/user/user.entity';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/users/role/role.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService]
})
export class AuthModule { }
