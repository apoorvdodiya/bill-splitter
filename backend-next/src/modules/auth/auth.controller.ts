import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginUserDto, ResetPasswordDto, SignUpUserDto, UserNameDto, VerifyUserDto } from './dto/user.dto';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() params: SignUpUserDto) {
    return this.authService.signUpUser(params);
  }

  @Post('login')
  async login(@Body() params: loginUserDto) {
    return this.authService.login(params);
  }

  @Post('verify')
  async verify(@Body() params: VerifyUserDto) {
    return this.authService.verify(params);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() params: UserNameDto) {
    return this.authService.forgotPassword(params);
  }

  @Post('reset-password')
  async resetPassword(@Body() params: ResetPasswordDto) {
    return this.authService.resetPassword(params);
  }
}
