import { Request, Response } from 'express';
import { GetUserByUsernameHandler } from '../../../src/handlers/GetUserByUsernameHandler';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';
import { UserTypes } from '../../../src/enums/UserTypes';

jest.mock('../../../src/repositories/UserRepository');

describe('GetUserByUsernameHandler', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let getUserByUsernameHandler: GetUserByUsernameHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(new MockDataSource()) as jest.Mocked<UserRepository>;
        getUserByUsernameHandler = new GetUserByUsernameHandler(userRepository);

        req = {
            body: {
                username: 'testuser',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return user and return 200', async () => {
        const mockUser = { username: 'testuser', password: 'password123', user_type: UserTypes.STUDENT, num_usp: '123456', roles: ['role1'] };
        userRepository.findOneByUsername.mockResolvedValue(mockUser);

        await getUserByUsernameHandler.handleRequest(req as Request, res as Response);

        expect(userRepository.findOneByUsername).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user is not found', async () => {
        userRepository.findOneByUsername.mockResolvedValue(undefined);

        await getUserByUsernameHandler.handleRequest(req as Request, res as Response);

        expect(userRepository.findOneByUsername).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
});