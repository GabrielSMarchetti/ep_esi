import { Request, Response } from 'express';
import { LoginHandler } from '../../../src/handlers/LoginHandler';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { MockDataSource } from '../../mocks/mockDataSource';
import { jest } from '@jest/globals';
import { UserTypes } from '../../../src/enums/UserTypes';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env.test' });

jest.mock('../../../src/repositories/UserRepository');

jest.mock('jsonwebtoken');

const mockDataSource = new MockDataSource();
const jwtSecret = process.env.JWT_SECRET;

describe('LoginHandler', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let loginHandler: LoginHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(mockDataSource) as jest.Mocked<UserRepository>;
        loginHandler = new LoginHandler(userRepository);

        req = {
            body: {
                username: 'testuser',
                password: 'testpassword',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return 401 if user is not found', async () => {
        userRepository.findOneByUsername.mockResolvedValue(undefined);

        await loginHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    });

    it('should return 200 and user data if login is successful', async () => {
        const mockUser = { id: 1, username: 'testuser', password: 'testpassword', num_usp: '123456', user_type: UserTypes.STUDENT, roles: ['student'] };
        userRepository.findOneByUsername.mockResolvedValue(mockUser);

        const mockToken = 'mocked-jwt-token';
        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        await loginHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: mockToken
        });
    });
});