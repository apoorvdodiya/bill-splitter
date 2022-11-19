import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: 'victoria\'s secret',
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'usersModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('usersModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class AuthModule { }
