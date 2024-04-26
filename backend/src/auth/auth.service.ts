import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

@Injectable()
export class AuthService {


  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async logIn(loginDto: LoginDto) {
    try {
      const user = await this.userService.findByUsername(loginDto.username)
      if (_.isEmpty(user)) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
      const comparePassword = await bcrypt.compareSync(loginDto.password, user.password);
      if (comparePassword == false) {
        throw new HttpException('user password unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const payload = { id: user.id, username: user.username };
      const { password, ...response } = user

      return { user: response, accessToken: await this.jwtService.signAsync(payload) }
    } catch (error) {
      throw error
    }
  }

  async register(loginDto: LoginDto) {

  }

}
