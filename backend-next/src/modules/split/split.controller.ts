import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SplitService } from './split.service';
import {
  CreateSplitDto,
  SettleByPayeeDto,
  SettleDto,
} from './dto/create-split.dto';
import { UpdateSplitDto } from './dto/update-split.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { httpErrors } from 'src/helpers/errors';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('split')
@Controller('split')
export class SplitController {
  constructor(private readonly splitService: SplitService) {}

  @Post()
  create(@Body() createSplitDto: CreateSplitDto, @Req() req: any) {
    return this.splitService.create(createSplitDto, req);
  }

  @Get()
  findAll(@Req() req) {
    return this.splitService.findAll(req);
  }

  @Get('my-split/:type')
  getUsersSplit(@Req() req: any, @Param('type') type: string) {
    return this.splitService.getUserSplits({ id: req.user.id, type });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.splitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSplitDto: UpdateSplitDto) {
    return this.splitService.update(+id, updateSplitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.splitService.remove(+id);
  }

  @Patch('/settle/borrower/:id')
  settleByBorrower(
    @Param('id') id: string,
    @Req() req: any,
    @Body() params: SettleDto,
  ) {
    return this.splitService.settleByBorrower(id, params);
  }

  @Patch('/settle/payee/:id')
  settleByPayee(@Param('id') id: string, @Body() params: SettleByPayeeDto) {
    return this.splitService.settleByPayee(id, params);
  }
}
