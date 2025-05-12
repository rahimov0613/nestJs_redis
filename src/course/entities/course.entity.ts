import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  teacher: string;
  @Column()
  price: string;
  @Column()
  summary: string;
  @Column()
  schedule: string;
  @CreateDateColumn({ default: new Date(Date.now()) })
  created_at: Date;
}
