import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import * as nestjsTypeormPaginate from 'nestjs-typeorm-paginate';
import { UpdateStudentInput } from './dto/update-student.input';



const studentArray: Array<Student> = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'Janedoe@fmail.com',
    dob: '1999-10-25',
    age: 23,
    deletedDate: null,
  },
  {
    id: 2,
    name: 'Jane Doe1',
    email: 'Janedoe1@gmail.com',
    dob: '1999-05-11',
    age: 23,
    deletedDate: null,
  },
  {
    id: 3,
    name: 'Jane Doe2',
    email: 'Janedoe2@gmail.com',
    dob: '2000-02-11',
    age: 23,
    deletedDate: null,
  },
];


jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
    items: [ {
      id: 1,
      name: 'Jane Doe',
      email: 'Janedoe@fmail.com',
      dob: '1999-10-25',
      age: 23,
      deletedDate: null,
    },
    {
      id: 2,
      name: 'Jane Doe1',
      email: 'Janedoe1@gmail.com',
      dob: '1999-05-11',
      age: 23,
      deletedDate: null,
    }],
    meta: {
      itemCount: 2,
      totalItems: 2,
      totalPages: 1,
      currentPage: 1,
    },
  }),
}));

const oneStudent: Student = {
  id: 1,
  name: 'Jane Doe',
  email: 'Janedoe@gmail.com',
  dob: '2000-8-22',
  age: 22,
  deletedDate: null,
};

const studentPayload: Array<CreateStudentInput> = [
  {
    name: 'Jane Doe',
    email: 'Janedoe@getMaxListeners.com',
    dob: '199-10-25',
  },
];

describe('StudentsService', () => {
  let studentsService: StudentsService;
  let studentsRepository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            find: jest.fn().mockResolvedValue(studentArray),
            findOne: jest.fn().mockResolvedValue(oneStudent),
            findOneOrFail: jest.fn(),
            create: jest.fn().mockResolvedValue(studentArray),
            save: jest.fn().mockResolvedValue(studentArray),
            update: jest.fn().mockResolvedValue(oneStudent),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
    studentsRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(studentsService).toBeDefined();
  });

  it('studentsRepository should be defined', () => {
    expect(studentsRepository).toBeDefined();
  });

  describe('Create students', () => {
    it('create function should be defined', () => {
      expect(studentsService.create).toBeDefined();
    });

    it('should throws an error when there is no payload provided', async () => {
      try {
        await studentsService.create([]);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should create students and save', async () => {
      expect(await studentsService.create(studentPayload)).toEqual(
        studentArray,
      );
      expect(studentsRepository.create).toHaveBeenCalledWith(studentPayload);
      expect(studentsRepository.save).toHaveBeenCalledWith(studentArray);
    });
  });

  describe('Get Students', () => {
    it('findAll function should be defined', () => {
      expect(studentsService.findAll).toBeDefined();
    });

    it('Should return all students', async () => {
      const students = await studentsService.findAll();
      expect(students).toEqual(studentArray);
      expect(studentsRepository.find).toHaveBeenCalled();
    });

    it('findOne function should be defined', () => {
      expect(studentsService.findOne).toBeDefined();
    });

    it('Should return one students', async () => {
      const repoSpy = jest.spyOn(studentsRepository, 'findOne');
      expect(studentsService.findOne(1)).resolves.toEqual(oneStudent);
      expect(repoSpy).toBeCalledWith(1);
    });

    it('paginate function should be defined', () => {
      expect(studentsService.paginate).toBeDefined();
    });

    it('Should return all the students with pagination', async () => {
      const paginatedData = await studentsService.paginate({ limit: 2, page: 1 });
      expect(paginatedData.items.length).toEqual(studentArray.splice(0,2).length)
    });
  });

  describe('Update Student', () => {
    it('update function should be defined', () => {
      expect(studentsService.update).toBeDefined();
    });

    it('should update student', async () => {
      const updatePayload: UpdateStudentInput = oneStudent;
      const updatedStudent = await studentsService.update(1, updatePayload);
      expect(studentsRepository.update).toBeCalledWith(1, oneStudent);
      const findOrFail = jest
        .spyOn(studentsRepository, 'findOneOrFail')
        .mockResolvedValueOnce(updatedStudent);
      expect(findOrFail).toBeCalledWith(1);
    });
  });

  describe('Remove Student', () => {
    it('Remove function should be defined', () => {
      expect(studentsService.remove).toBeDefined();
    });

    it('should remove student', async () => {
      const deleted = await studentsService.remove(1);
      expect(deleted).toEqual(true);
      expect(studentsRepository.findOne).toBeCalledWith(1);
      expect(studentsRepository.softDelete).toBeCalledWith(1);
    });
  });
});
