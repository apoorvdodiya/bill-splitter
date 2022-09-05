import { Module } from '@nestjs/common';
import { SplitService } from './split.service';
import { SplitController } from './split.controller';
import { Split } from './entities/split.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Splitter } from './entities/splitter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Split, Splitter])],
  controllers: [SplitController],
  providers: [SplitService]
})
export class SplitModule {}
