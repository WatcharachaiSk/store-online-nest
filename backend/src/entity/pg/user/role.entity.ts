import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'role_user' })
export class RoleUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'name_th' })
  nameTH: string;

  @Column({ name: 'role_of_magnitude' })
  roleOfMagnitude: number;
  

}
