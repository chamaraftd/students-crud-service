import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRespository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput[]): Promise<Student[]> {
    const students = await this.studentRespository.create(createStudentInput);
    return await this.studentRespository.save(students);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Student>> {
    return await paginate<Student>(this.studentRespository, options);
  }

  async findAll() {
    return await this.studentRespository.find();
  }

  async findOne(id: number): Promise<Student> {
    return await this.studentRespository.findOne(id);
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    await this.studentRespository.update(id, { ...updateStudentInput });
    const updatedRecord = await this.studentRespository.findOneOrFail(id);
    return updatedRecord;
  }

  async remove(id: number) {
    const isAvailable = await this.studentRespository.findOne(id);
    if (isAvailable) {
      await this.studentRespository.softDelete(id);
      return true;
    } else return false;
  }
}
