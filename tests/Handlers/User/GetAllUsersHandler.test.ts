import { Request, Response } from 'express';
import { UserController } from '../../../src/controllers/UserController';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';
import { UserTypes } from '../../../src/enums/UserTypes';

jest.mock('../../../src/repositories/UserRepository');

describe('UserController', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let userController: UserController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(new MockDataSource()) as jest.Mocked<UserRepository>;
        userController = new UserController(userRepository);

        req = {};
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return all users and return 200', async () => {
        const mockUsers = [
            { username: 'user1', user_type: UserTypes.COORDINATOR, num_usp: '123456', password: 'password1', roles: ['coordinator'] },
            { username: 'user2', user_type: UserTypes.MENTOR, num_usp: '654321', password: 'password2', roles: ['mentor'] },
        ];
        userRepository.find.mockResolvedValue(mockUsers);

        await userController.getAllUsers(req as Request, res as Response);

        expect(userRepository.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
});