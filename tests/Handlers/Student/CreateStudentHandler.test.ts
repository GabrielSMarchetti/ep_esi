import { Request, Response } from 'express';
import { CreateStudentHandler } from '../../../src/handlers/CreateStudentHandler';
import { StudentRepository } from '../../../src/repositories/StudentRepository';
import { jest } from '@jest/globals';
import { validateCourseType } from '../../../src/enums/CourseTypes';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/StudentRepository');
jest.mock('../../../src/enums/CourseTypes');

describe('CreateStudentHandler', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let createStudentHandler: CreateStudentHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        studentRepository = new StudentRepository(mockDataSource) as jest.Mocked<StudentRepository>;
        createStudentHandler = new CreateStudentHandler(studentRepository);

        req = {
            body: {
                num_usp: '123456',
                nome: 'John Doe',
                curso: 'ValidCourse',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should create a student and return 200', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(true);
        studentRepository.findBy.mockResolvedValue([]);
        studentRepository.save.mockResolvedValue(req.body);

        await createStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(studentRepository.findBy).toHaveBeenCalledWith({ num_usp: '123456' });
        expect(studentRepository.save).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return 400 if curso is invalid', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(false);

        await createStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid curso' });
    });

    it('should return 409 if student already exists', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(true);
        studentRepository.findBy.mockResolvedValue([req.body]);

        await createStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(studentRepository.findBy).toHaveBeenCalledWith({ num_usp: '123456' });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ error: 'Student already exists' });
    });
});