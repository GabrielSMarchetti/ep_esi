import { Request, Response } from 'express';
import { UpdateStudentHandler } from '../../../src/handlers/UpdateStudentHandler';
import { StudentRepository } from '../../../src/repositories/StudentRepository';
import { jest } from '@jest/globals';
import { UpdateResult } from 'typeorm';
import { validateCourseType } from '../../../src/enums/CourseTypes';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/StudentRepository');
jest.mock('../../../src/enums/CourseTypes');

describe('UpdateStudentHandler', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let updateStudentHandler: UpdateStudentHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        studentRepository = new StudentRepository(mockDataSource) as jest.Mocked<StudentRepository>;
        updateStudentHandler = new UpdateStudentHandler(studentRepository);

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

    it('should update a student and return 200', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(true);
        studentRepository.findOneByNumeroUSP.mockResolvedValue(req.body);
        studentRepository.update.mockResolvedValue({ affected: 1 } as UpdateResult);
        studentRepository.findOneByNumeroUSP.mockResolvedValue(req.body);

        await updateStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(studentRepository.findOneByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(studentRepository.update).toHaveBeenCalledWith('123456', req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return 400 if curso is invalid', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(false);

        await updateStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid curso' });
    });

    it('should return 404 if student is not found', async () => {
        (validateCourseType as jest.Mock).mockReturnValue(true);
        studentRepository.findOneByNumeroUSP.mockResolvedValue(undefined);

        await updateStudentHandler.handleRequest(req as Request, res as Response);

        expect(validateCourseType).toHaveBeenCalledWith('ValidCourse');
        expect(studentRepository.findOneByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Student not found' });
    });
});