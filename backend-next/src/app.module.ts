import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [AuthModule, GroupsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
  ],
})
export class AppModule {}
