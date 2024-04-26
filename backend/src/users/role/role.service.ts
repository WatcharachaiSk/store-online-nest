import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleUserEntity } from 'src/entity/pg/user/role.entity';
import { Repository } from 'typeorm';
import * as _ from "lodash";
import { RoleEnum, RoleType } from 'src/enum/role.enum';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);

  constructor(
    @InjectRepository(RoleUserEntity)
    private roleUserRepository: Repository<RoleUserEntity>,
  ) {
    this.init();

  }
  async init() {
    try {
      const findRoles = await this.roleUserRepository.count()
      if (findRoles == 0) {
        this.logger.log("init role");

        const roleAdmin = new RoleUserEntity();
        roleAdmin.name = RoleEnum.Admin;
        roleAdmin.nameTH = RoleEnum.AdminTH;
        roleAdmin.roleOfMagnitude = RoleType.indexOf(RoleEnum.Admin);
        await this.roleUserRepository.save(roleAdmin);

        const roleManager = new RoleUserEntity();
        roleManager.name = RoleEnum.Manager;
        roleManager.nameTH = RoleEnum.ManagerTH;
        roleManager.roleOfMagnitude = RoleType.indexOf(RoleEnum.Manager);
        await this.roleUserRepository.save(roleManager);

        const roleCashier = new RoleUserEntity();
        roleCashier.name = RoleEnum.Cashier;
        roleCashier.nameTH = RoleEnum.CashierTH;
        roleCashier.roleOfMagnitude = RoleType.indexOf(RoleEnum.Cashier);
        await this.roleUserRepository.save(roleCashier);

        const roleStockKeeper = new RoleUserEntity();
        roleStockKeeper.name = RoleEnum.StockKeeper;
        roleStockKeeper.nameTH = RoleEnum.StockKeeperTH;
        roleStockKeeper.roleOfMagnitude = RoleType.indexOf(RoleEnum.StockKeeper);
        await this.roleUserRepository.save(roleStockKeeper);

        const roleCustomer = new RoleUserEntity();
        roleCustomer.name = RoleEnum.Customer;
        roleCustomer.nameTH = RoleEnum.CustomerTH;
        roleCustomer.roleOfMagnitude = RoleType.indexOf(RoleEnum.Customer);
        await this.roleUserRepository.save(roleCustomer);

        const roleMember = new RoleUserEntity();
        roleMember.name = RoleEnum.Member;
        roleMember.nameTH = RoleEnum.MemberTH;
        roleMember.roleOfMagnitude = RoleType.indexOf(RoleEnum.Member);
        await this.roleUserRepository.save(roleMember);

        const roleGuest = new RoleUserEntity();
        roleGuest.name = RoleEnum.Guest;
        roleGuest.nameTH = RoleEnum.GuestTH;
        roleGuest.roleOfMagnitude = RoleType.indexOf(RoleEnum.Guest);
        await this.roleUserRepository.save(roleGuest);
      }

    } catch (error) {
      this.logger.log("init error ", error);
    }
  }

  async findRoleByIndexOf(index: number) {
    try {
      const role = await this.roleUserRepository.findOne({ where: { roleOfMagnitude: index } })
      return role
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleUserRepository.findOne({ where: { id: id } })
      return role
    } catch (error) {
      throw error
    }
  }

}
