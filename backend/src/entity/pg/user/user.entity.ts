import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfo } from './userInfo.entity';
import { RoleUser } from './role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user)
  @JoinColumn({ name: 'info_id', referencedColumnName: 'id' })
  userInfo: UserInfo;

  @ManyToOne(() => RoleUser, (roleUser) => roleUser.user)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleUser: RoleUser;
}
