import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: any) {
    return this.groupsService.create(createGroupDto, req);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('users')
  findAllUsers() {
    return this.groupsService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(id);
  // }
}
