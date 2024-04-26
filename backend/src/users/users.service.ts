import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/pg/user/user.entity';
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { RoleService } from './role/role.service';
import { RoleEnum, RoleType } from 'src/enum/role.enum';
import { response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,

  ) {
    this.init();
  }
  async init() {
    try {
      const findUsers = await this.userRepository.find()
      if (_.isEmpty(findUsers)) {
        const roleAdmin = await this.roleService.findRoleByIndexOf(RoleType.indexOf(RoleEnum.Admin))
        this.logger.log("init user");
        const hashPass = new UserEntity();
        const userAdmin = this.userRepository.create({
          username: "adminStore",
          password: await hashPass.hashPassword('!adminStore', 10),
          firstName: 'Admin',
          lastName: 'admin',
          email: 'admin@example.com',
          roleUser: roleAdmin
        })
        await this.userRepository.save(userAdmin)
      }
    } catch (error) {
      throw error
    }

  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const findByUsername = await this.userRepository.findOne({
        where: {
          username: createUserDto.username
        }
      })
      if (!_.isEmpty(findByUsername)) {
        throw new HttpException('user already exists', HttpStatus.CONFLICT);
      }

      const findRole = await this.roleService.findOne(createUserDto.roleId)
      if (_.isEmpty(findRole)) {
        throw new HttpException('role user not found', HttpStatus.NOT_FOUND);
      }


      const hashPass = new UserEntity();
      const createUser = this.userRepository.create({
        username: createUserDto.username,
        password: await hashPass.hashPassword(createUserDto.password, 10),
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        roleUser: findRole
      })

      const userSave = await this.userRepository.save(createUser)

      const { password, ...response } = userSave
      return response

    } catch (error) {
      throw error
    }
  }

  async findByUsername(username: string) {
    try {
      const findUser = await this.userRepository.findOne({
        where: { username: username }
      })
      return findUser
    } catch (error) {
      throw error
    }
  }
  async find() {
    try {
      return await this.userRepository.find()
    } catch (error) {
      throw error
    }
  }

}
