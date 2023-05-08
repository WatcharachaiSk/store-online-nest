import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity('role_user')
export class RoleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_role' })
  isRole: string;

  @OneToMany(() => User, (user) => user.roleUser)
  // @JoinColumn({ name: 'p_id', referencedColumnName: 'p_id' })
  user: User[];
}
