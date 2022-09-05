import { User } from 'src/modules/auth/entities/user.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Splitter } from './splitter.entity';

@Entity()
export class Split {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  totalAmount: number;

  @Column()
  description: string;

  @OneToMany(() => Splitter, (splitter) => splitter.split, { cascade: true })
  splitters: Splitter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ default: false })
  settled: boolean;
}
