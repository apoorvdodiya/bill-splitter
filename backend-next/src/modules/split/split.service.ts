import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { httpErrors } from 'src/helpers/errors';
import { httpResponses } from 'src/helpers/response';
import { Repository } from 'typeorm';
import {
  CreateSplitDto,
  SettleByPayeeDto,
  SettleDto,
} from './dto/create-split.dto';
import { UpdateSplitDto } from './dto/update-split.dto';
import { Split } from './entities/split.entity';
import { Splitter } from './entities/splitter.entity';

@Injectable()
export class SplitService {
  constructor(
    @InjectRepository(Split)
    private splitRepository: Repository<Split>,
    @InjectRepository(Splitter)
    private splitterRepository: Repository<Splitter>,
  ) {}

  async create(params: CreateSplitDto, req) {
    try {
      await this.splitRepository.save({ ...params, createdById: req.user.id });
      return httpResponses.single('Split created successfully!');
    } catch (error) {
      throw error;
    }
  }

  async findAll(req) {
    try {
      const splits = await this.splitRepository.find({
        relations: ['splitters'],
      });
      return httpResponses.list('List of splits', splits);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async findOne(id: number) {
    try {
      const split = await this.splitRepository.findOne({
        where: { id },
        relations: ['splitters'],
      });
      if (!split) {
        throw httpErrors.notFound('Split not found!');
      }
      return httpResponses.single('Successfully fetch Split', split);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async update(id: number, params: UpdateSplitDto) {
    try {
      const split = await this.splitRepository.findOneById(id);
      if (!split) {
        throw httpErrors.notFound('Split not found!');
      }
      const updatedSplit = { ...params, id };
      await this.splitRepository.save(updatedSplit);
      return httpResponses.single('Updated split successfully');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async remove(id: number) {
    try {
      const split = await this.splitRepository.findOneById(id);
      if (!split) {
        throw httpErrors.notFound('Split not found!');
      }
      await this.splitRepository.softDelete(id);
      return httpResponses.single('Deleted split data successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async getUserSplits({ id, type }: any) {
    try {
      const userSplits = [];
      const query = this.splitRepository
        .createQueryBuilder('s')
        .leftJoinAndSelect('s.splitters', 'splitter')
        .leftJoinAndSelect('s.createdBy', 'user')
        .leftJoinAndSelect('splitter.user', 'userX');

      if (type === 'paid') {
        userSplits.push(
          ...(await query
            .where('createdById = :id AND settled = false', { id: +id })
            .getMany()),
        );
      } else if (type === 'owed') {
        userSplits.push(
          ...(await query
            .where('splitter.userId = :id AND settled = false', { id: +id })
            .getMany()),
        );
      } else if (type === 'settled') {
        userSplits.push(
          ...(await query
            .where('createdById = :id AND settled = true', { id: +id })
            .getMany()),
        );
      } else {
        userSplits.push(...(await query.getMany()));
      }
      return httpResponses.list("List of user's split!", userSplits);
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async settleByBorrower(id: string, params: SettleDto) {
    try {
      const splitter = await this.splitterRepository.findOne({
        where: { id: +id },
      });

      if (!splitter) {
        throw httpErrors.notFound('Split data not found!');
      }
      if (splitter.paidAmount >= params.amount) {
        throw httpErrors.badReq('Amount is greater than owed amount!');
      }

      const split = await this.splitRepository.findOne({
        where: {
          id: splitter.splitId,
        },
        relations: ['splitters'],
      });

      let totalPaid = 0;
      for (const splitter of split.splitters) {
        totalPaid += splitter.paidAmount;
      }

      if (totalPaid == split.totalAmount) {
        split.settled = true;
        await this.splitRepository.save(split);
      }

      splitter.paidAmount = splitter.paidAmount
        ? splitter.paidAmount + params.amount
        : params.amount;
      this.splitterRepository.save(splitter);
      return httpResponses.single('Updated splitter data successfully!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }

  async settleByPayee(id: string, params: SettleByPayeeDto) {
    try {
      const splitter = await this.splitterRepository.findOne({
        where: { id: +id },
      });

      if (!splitter) {
        throw httpErrors.notFound('Splitter data not found!');
      }
      if (splitter.paidAmount >= params.amount) {
        throw httpErrors.badReq('Amount is greater than owed amount!');
      }

      const split = await this.splitRepository.findOne({
        where: {
          id: splitter.splitId,
        },
        relations: ['splitters'],
      });

      let totalPaid = 0;
      for (const splitter of split.splitters) {
        totalPaid += splitter.paidAmount;
      }
      console.log(totalPaid);
      

      if (totalPaid == split.totalAmount) {
        console.log(true);
        
        split.settled = true;
        await this.splitRepository.save(split);
      }

      splitter.paidAmount = splitter.paidAmount
        ? splitter.paidAmount + params.amount
        : params.amount;

      this.splitterRepository.save(splitter);

      return httpResponses.single('Updated splitter data!');
    } catch (error) {
      throw error?.message ? error : httpErrors.serverError();
    }
  }
}
