import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Holiday } from './holiday.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Holiday, (holiday) => holiday.user)
  holidays: Holiday[];
}
