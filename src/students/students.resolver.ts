import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput, PaginateOptions } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PaginateResponse } from './entities/paginate.entity';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => [Student])
  createStudent(
    @Args('createStudentInput', { type: () => [CreateStudentInput] })
    createStudentInput: CreateStudentInput[],
  ) {
    return this.studentsService.create(createStudentInput);
  }

  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentsService.findAll();
  }
  
  @Query(() => PaginateResponse, { name: 'paginateStudents' })
  paginate(@Args('option', { type: () => PaginateOptions }) options:PaginateOptions ) {
    return this.studentsService.paginate(options);
  }
  

  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentsService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Boolean)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.remove(id);
  }
}
