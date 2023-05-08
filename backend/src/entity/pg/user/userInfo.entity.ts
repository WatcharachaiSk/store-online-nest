import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_info')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToOne(() => User, (user) => user.userInfo)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
