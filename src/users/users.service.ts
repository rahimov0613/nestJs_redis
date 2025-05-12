import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }
  async refresh(token: string) {
    const user = await this.userRepo.findOne({
      where: { refreshToken: token },
    });
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async validateUser(username: string, password: string) {
    try {
      const user = await this.userRepo.findOne({
        where: { username },
        select: ['email', 'password', 'role', 'username', 'name', 'id'],
      });
      if (!user) throw new NotFoundException('User topilmadi');

      console.log(user);

      const checking = await compare(password, user.password);
      console.log(checking);

      if (!checking) throw new BadRequestException('Parol xato');
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(id: string, updateData: any) {
    const user = await this.userRepo.findOneBy({ id });
    Object.assign(user, updateData);
    await this.userRepo.save(user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
