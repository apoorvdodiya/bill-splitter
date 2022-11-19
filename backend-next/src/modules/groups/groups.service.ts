import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { httpErrors } from 'src/helpers/errors';
import { httpResponses } from 'src/helpers/response';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('groupsModel') private groupsModel: Model<any>,
    @Inject('usersModel') private usersModel: Model<any>,
  ) {}

  async create(params: CreateGroupDto, req: any) {
    try {
      console.log(req);
      // const members = await this.usersModel.find({
      //   _id: { $in: params.members },
      // });

      const group = await this.groupsModel.insertMany([
        {
          name: params.name,
          members: params.members,
        },
      ]);

      return httpResponses.single('Group created successfully!', group);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findAll() {
    try {
      const groups = await this.groupsModel.find({
        // {
        //   $in: ['']
        // }
      }).populate('members');
      return httpResponses.list('User groups list', groups);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findOne(id: string) {
    try {
      const group = await this.groupsModel.findById(id);
      if (!group) throw httpErrors.notFound('Group not found!');

      return httpResponses.single('Group details', group);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async update(id: string, params: UpdateGroupDto) {
    try {
      const group = await this.groupsModel.findById(id);

      if (!group) {
        throw httpErrors.notFound('Group not found!');
      }

      group.name = params.name;
      group.members = params.members;

      await group.save();

      return httpResponses.single('Group details updated successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
