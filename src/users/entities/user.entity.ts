import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role.enum';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ default: UserRole.user })
  role: UserRole;
  @Column({ nullable: true, select: false })
  refreshToken: string;
  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  async hash() {
    console.log(this.password);

    this.password = await hash(this.password, 12);
    console.log(this.password, '---afterhashing');
  }
}
