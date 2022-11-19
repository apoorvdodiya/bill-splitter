import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import mongoose from 'mongoose';
import { GroupSchema } from './schema/groups.schema';
import { UserSchema } from '../auth/schema/users.schema';

@Module({
  controllers: [GroupsController],
  providers: [
    GroupsService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'groupsModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('groupsModel', GroupSchema),
      inject: ['DB_CONNECTION'],
    },
    {
      provide: 'usersModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('usersModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class GroupsModule {}
