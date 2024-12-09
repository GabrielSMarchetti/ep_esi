import { Request, Response } from 'express';
import { CreateUserHandler } from '../../../src/handlers/CreateUserHandler';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { jest } from '@jest/globals';
import { validateUserType } from '../../../src/enums/UserTypes';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();
jest.mock('../../../src/repositories/UserRepository');
jest.mock('../../../src/enums/UserTypes');

describe('CreateUserHandler', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let createUserHandler: CreateUserHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(mockDataSource) as jest.Mocked<UserRepository>;
        createUserHandler = new CreateUserHandler(userRepository);

        req = {
            body: {
                username: 'testuser',
                password: 'password123',
                user_type: 'admin',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should create a user and return 200', async () => {
        (validateUserType as jest.Mock).mockReturnValue(true);
        userRepository.save.mockResolvedValue(req.body);

        await createUserHandler.handleRequest(req as Request, res as Response);

        expect(validateUserType).toHaveBeenCalledWith('admin');
        expect(userRepository.save).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return 400 if required fields are missing', async () => {
        req.body = {
            username: 'testuser',
        };

        await createUserHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
    });

    it('should return 400 if user type is invalid', async () => {
        req.body.user_type = 'invalid_type';
        (validateUserType as jest.Mock).mockReturnValue(false);

        await createUserHandler.handleRequest(req as Request, res as Response);

        expect(validateUserType).toHaveBeenCalledWith('invalid_type');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid usertype' });
    });
});