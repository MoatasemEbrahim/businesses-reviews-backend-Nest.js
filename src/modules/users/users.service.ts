import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { User } from '../../interfaces/user.interface';
import { AuthUser, TokenUser } from '../../interfaces/user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<User>,
  ) {}

  async syncUserWithAuth0(userDetails: AuthUser): Promise<void> {
    const { email, email_verified, name, user_id } = userDetails;

    const user = await this.findUserByEmail(userDetails?.email);

    if (!user) {
      await this.create({
        emailVerified: email_verified,
        email,
        name,
        authId: user_id,
      });
    }
  }

  async create(userDetails: User): Promise<User> {
    return this.usersRepository.save(userDetails);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getProfile(user: TokenUser): Promise<User | null> {
    const userResponse = await this.findUserByEmail(user.authDetails.email);
    if (!userResponse) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { ...user.authDetails, ...userResponse };
  }
}
