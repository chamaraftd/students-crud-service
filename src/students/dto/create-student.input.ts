/* eslint-disable @typescript-eslint/ban-types */
import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsEmail()
  @Length(2, 75)
  email: string;

  @Field()
  @Length(2, 75)
  name: string;

  @Field()
  @IsDateString()
  dob: string;
}


@InputType()
export class PaginateOptions {
  @Field()
  limit:number;

  @Field()
  page:number;
}
