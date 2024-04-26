import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'imgs' })
export class Imgs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;
}
