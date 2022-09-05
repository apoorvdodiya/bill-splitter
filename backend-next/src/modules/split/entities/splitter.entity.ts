import { User } from 'src/modules/auth/entities/user.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Split } from './split.entity';

@Entity()
export class Splitter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ration: number;

  @Column()
  amount: number;

  @Column()
  splitId: number;

  @ManyToOne(() => Split, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  split: Split;

  @ManyToOne(() => Group, { eager: true })
  group: Group;

  @Column({ nullable: true })
  groupId: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ default: 0 })
  paidAmount: number;

  // @ManyToMany(() => )
  // history:
}

// @Entity()
// export class History {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   amount: number;

// }
