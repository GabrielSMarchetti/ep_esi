import { Request, Response } from 'express';
import { StudentController } from '../../../src/controllers/StudentController';
import { StudentRepository } from '../../../src/repositories/StudentRepository';
import { jest } from '@jest/globals';
import { studentFixture, studentFixture2, studentFixture3 } from './studentFixture';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/StudentRepository');

describe('StudentController', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let studentController: StudentController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        studentRepository = new StudentRepository(mockDataSource) as jest.Mocked<StudentRepository>;
        studentController = new StudentController(studentRepository);

        req = {};
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return all students and return 200', async () => {
        studentRepository.find.mockResolvedValue([studentFixture, studentFixture2, studentFixture3]);

        await studentController.getAllStudents(req as Request, res as Response);

        expect(studentRepository.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([studentFixture, studentFixture2, studentFixture3]);
    });
});