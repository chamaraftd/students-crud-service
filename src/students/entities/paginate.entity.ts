import { Field, ObjectType } from "@nestjs/graphql"
import { GraphQLInt } from "graphql"
import { Student } from "./student.entity"


@ObjectType()
export class Meta {
  @Field(() => GraphQLInt)
  totalItems: number

  @Field(() => GraphQLInt)
  itemCount: number

  @Field(() => GraphQLInt)
  itemsPerPage: number

  @Field(() => GraphQLInt)
  totalPages: number

  @Field(() => GraphQLInt)
  currentPage: number
}


@ObjectType()
export class PaginateResponse {
  @Field(() => [Student])
  items: Student[]

  @Field(() => Meta)
  meta: Meta
}
