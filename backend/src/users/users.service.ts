import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/pg/user/user.entity';
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { RoleService } from './role/role.service';
import { RoleEnum, RoleType } from 'src/enum/role.enum';


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
}
