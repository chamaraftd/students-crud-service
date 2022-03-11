/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { calculateAgeMiddleware } from '../../middlewares/calulate-age.middleware';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dob: string;

  @Field({ middleware: [calculateAgeMiddleware] })
  age: number;

  @DeleteDateColumn({ select: true })
  deletedDate?: Date;
}
