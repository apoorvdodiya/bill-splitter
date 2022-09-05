import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { User } from '../auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, CommonModule])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
