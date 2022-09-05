import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GroupsModule } from './modules/groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/auth/entities/user.entity';
import { Group } from './modules/groups/entities/group.entity';
import { JwtStrategy } from './stretagies/jwt';
import { Split } from './modules/split/entities/split.entity';
import { SplitModule } from './modules/split/split.module';
import { Splitter } from './modules/split/entities/splitter.entity';
@Module({
  imports: [
    AuthModule,
    GroupsModule,
    SplitModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ...(process.env.ENV == 'prod'
        ? {
            ssl: {
              rejectUnauthorized: true,
            },
          }
        : {}),
      entities: [User, Group, Split, Splitter],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule {}
