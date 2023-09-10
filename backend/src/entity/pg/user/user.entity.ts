import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { RoleUserEntity } from './role.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => RoleUserEntity, (roleUser) => roleUser.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleUser: RoleUserEntity;

  async hashPassword(password: string, saltOrRounds: number) {
    return await bcrypt.hash(password, saltOrRounds);
  }
}
