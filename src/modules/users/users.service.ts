import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<User>,
  ) {}

  async syncUserWithAuth0(userDetails: any): Promise<void> {
    const { email, email_verified, name, user_id } = userDetails;

    const user = await this.findUserByEmail(userDetails?.email);

    if (!user) {
      await this.create({ email_verified, email, name, authId: user_id });
      console.log('user created');
    } else {
      console.log('user already exists');
    }
  }

  async create(userDetails): Promise<void> {
    return this.usersRepository.save(userDetails);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  // async findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
