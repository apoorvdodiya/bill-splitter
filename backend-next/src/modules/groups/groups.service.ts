import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/errors';
import { httpResponses } from 'src/helpers/response';
import { In, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(params: CreateGroupDto, req: any) {
    try {
      console.log(params.members);
      
      const members = await this.userRepository.find({
        where: {
          id: In(params.members),
        },
      });
      console.log(members);

      const group = new Group();
      group.name = params.name;
      group.members = members;

      this.groupRepository.save(group);

      return httpResponses.single('Group created successfully!', group);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findAll() {
    try {
      const groups = await this.groupRepository.find({
        relations: ['members'],
        // wwhere : {
        //   members: 6
        // }
      });
      return httpResponses.list('User groups list', groups);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.groupRepository.findOne({
        where: { id },
        relations: ['members'],
      });
      if (!group) throw httpErrors.notFound('Group not found!');

      return httpResponses.single('Group details', group);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findAllUsers() {
    try {
      const users = await this.userRepository.find();
      return httpResponses.list('Users list', users);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async update(id: number, params: UpdateGroupDto) {
    try {
      const group = await this.groupRepository.findOne({
        relations: ['members'],
        where: { id },
      });

      if (!group) {
        throw httpErrors.notFound('Group not found!');
      }

      group.name = params.name;
      group.members = await this.userRepository.find({
        where: {
          id: In(params.members)
        }
      })

      await this.groupRepository.save(group);

      return httpResponses.single('Group details updated successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
