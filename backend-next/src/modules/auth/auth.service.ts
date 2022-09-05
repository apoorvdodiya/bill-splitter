import { Injectable } from '@nestjs/common';
import { httpErrors } from 'src/helpers/errors';
import { httpResponses } from 'src/helpers/response';
import { loginUserDto, SignUpUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUpUser(params: SignUpUserDto) {
    try {
      const users = await this.usersRepository.find({
        where: [{ userName: params.userName }, { email: params.email }],
      });

      if (users.find((u) => u.email === params.email)) {
        throw httpErrors.badReq('Email is already used');
      } else if (users.find((u) => u.userName === params.userName)) {
        throw httpErrors.badReq('Username is already used');
      }

      const salt = bcrypt.genSaltSync(10);
      params.password = bcrypt.hashSync(params.password, salt);
      // params.password = hash;

      const user = await this.usersRepository.insert({
        ...params,
        ...{ password: params.password },
      });

      return httpResponses.single('Sign up completed successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async login(params: loginUserDto) {
    try {
      const user = await this.usersRepository
        .findOne({
          where: [{ userName: params.userName }, { email: params.userName }],
        });

      if (!user) {
        throw httpErrors.badReq('User does not exists!');
      }

      if (!bcrypt.compareSync(params.password, user.password)) {
        throw httpErrors.badReq('Invalid user credentials');
      }

      const token = this.createJwtToken(user);
      console.log(token);

      return httpResponses.single('User logged in successfully!', {
        ...user,
        token,
      });
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  createJwtToken(user: any) {
    const payload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
