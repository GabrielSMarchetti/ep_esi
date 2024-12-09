import { Request, Response } from 'express';
import { GetAllMentorsHandler } from '../../../src/handlers/GetAllMentorsHandler';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';
import { UserTypes } from '../../../src/enums/UserTypes';

jest.mock('../../../src/repositories/UserRepository');

describe('GetAllMentorsHandler', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let getAllMentorsHandler: GetAllMentorsHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(new MockDataSource()) as jest.Mocked<UserRepository>;
        getAllMentorsHandler = new GetAllMentorsHandler(userRepository);

        req = {};
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return all mentors and return 200', async () => {
        const mockMentors = [
            { username: 'mentor1', user_type: UserTypes.MENTOR, num_usp: '123456', password: 'password1', roles: ['mentor'] },
            { username: 'mentor2', user_type: UserTypes.MENTOR, num_usp: '654321', password: 'password2', roles: ['mentor'] },
        ];
        userRepository.findAllMentors.mockResolvedValue(mockMentors);

        await getAllMentorsHandler.handleRequest(req as Request, res as Response);

        expect(userRepository.findAllMentors).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockMentors);
    });
});