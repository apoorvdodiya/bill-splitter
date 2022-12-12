import { Injectable } from '@nestjs/common';
import { httpErrors } from 'src/helpers/errors';
import { httpResponses } from 'src/helpers/response';
import { loginUserDto, ResetPasswordDto, SignUpUserDto, UserNameDto, VerifyUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/modules/common/mail/mail.service';
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }

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

      params.password = this.encodePassword(params.password)
      // params.password = hash;

      const verifyUrl = process.env.CLIENT_URL;
      const code = this.generateCode();
      const user = await this.usersRepository.insert({
        ...params,
        ...{
          password: params.password,
          code,
        },
      });
      this.mailService.sendSingleEmail({
        from: process.env.MAILER_EMAIL,
        to: params.email,
        subject: "Welcome to My Cut!",
        html: `
          Your verification code is <b>${code}</b>
        `
      })

      return httpResponses.single('Sign up completed successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async login(params: loginUserDto) {
    try {
      const user = await this.usersRepository
        .findOne({
          select: ['firstName', 'lastName', 'password', 'userName', 'email', 'id', 'isVerified'],
          where: [{ userName: params.userName }, { email: params.userName }],
        });

      if (!user) {
        throw httpErrors.badReq('User does not exists!');
      }
      if (!user.isVerified) {
        delete user.password;
        return httpResponses.single('User not verified!', {
          ...user
        })
      }
      
      if (!bcrypt.compareSync(params.password, user.password)) {
        throw httpErrors.badReq('Invalid user credentials');
      }
      
      delete user.password;
      const token = this.createJwtToken(user);
      return httpResponses.single('User logged in successfully!', {
        ...user,
        token,
      });
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async verify(params: VerifyUserDto) {
    try {
      const user = await this.usersRepository
        .findOne({
          where: [
            { userName: params.userName },
            { email: params.userName }
          ],
        });

      if (!user) {
        throw httpErrors.badReq('User does not exists!');
      } else if (user.code !== params.code) {
        throw httpErrors.badReq('Invalid verification code!');
      }
      await this.usersRepository.update(params,
        {
          isVerified: true,
          code: null
        })

      return httpResponses.single('User verified successfully!', {
        ...user
      });
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async forgotPassword(params: UserNameDto) {
    try {
      const user = await this.usersRepository
        .findOne({
          where: [
            { userName: params.userName },
            { email: params.userName }
          ],
        });

      if (!user) {
        throw httpErrors.badReq('User does not exists!');
      }

      const code = this.generateCode(4);
      await this.usersRepository.update({
        id: user.id
      },
        {
          code: code || '123'
        })
      this.mailService.sendSingleEmail({
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: "Reset password requested",
        html: `
            Use this code to reset your password: ${code}
          `
      })

      return httpResponses.single('Reset password code is sent successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async resetPassword(params: ResetPasswordDto) {
    try {
      const user = await this.usersRepository
        .findOne({
          where: [
            { userName: params.userName },
            { email: params.userName }
          ],
        });


      if (!user) {
        throw httpErrors.badReq('User does not exists!');
      } else if (user.code !== params.code) {
        throw httpErrors.badReq('Invalid reset code!');
      }

      await this.usersRepository.update({
        id: user.id
      },
        {
          code: null,
          password: this.encodePassword(params.newPassword)
        })
      this.mailService.sendSingleEmail({
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: "Alert! Your password was changed",
        html: `Your password was changed`

      })
      return httpResponses.single('Password reset successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  generateCode(bytes = 3) {
    return randomBytes(bytes).toString('hex').toUpperCase();
  }

  encodePassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  createJwtToken(user: any) {
    const payload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
