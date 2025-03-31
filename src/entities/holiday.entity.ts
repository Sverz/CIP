import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @Column()
  year: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.holidays, { onDelete: 'CASCADE' })
  user: User;
}
