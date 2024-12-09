import { Request, Response } from 'express';
import { GetAllMentorStudentsHandler } from '../../../src/handlers/GetAllMentorStudentsHandler';
import { StudentRepository } from '../../../src/repositories/StudentRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';
import { studentFixture, studentFixture2, studentFixture3 } from './studentFixture';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/StudentRepository');

describe('GetAllMentorStudentsHandler', () => {
    let studentRepository: jest.Mocked<StudentRepository>;
    let getAllMentorStudentsHandler: GetAllMentorStudentsHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        studentRepository = new StudentRepository(mockDataSource) as jest.Mocked<StudentRepository>;
        getAllMentorStudentsHandler = new GetAllMentorStudentsHandler(studentRepository);

        req = {
            params: {
                mentor: 'mentor123',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return students for the mentor and return 200', async () => {
        const mockStudents = [
            studentFixture,
            studentFixture3
        ];
        studentRepository.findAllByMentor.mockResolvedValue(mockStudents);

        await getAllMentorStudentsHandler.handleRequest(req as Request, res as Response);

        expect(studentRepository.findAllByMentor).toHaveBeenCalledWith('mentor123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockStudents);
    });
});