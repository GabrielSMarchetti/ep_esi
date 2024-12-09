import { Request, Response } from 'express';
import { UpdateUserHandler } from '../../../src/handlers/UpdateUserHandler';
import { UserRepository } from '../../../src/repositories/UserRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/UserRepository');

describe('UpdateUserHandler', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let updateUserHandler: UpdateUserHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        userRepository = new UserRepository(mockDataSource) as jest.Mocked<UserRepository>;
        updateUserHandler = new UpdateUserHandler(userRepository);

        req = {
            body: {
                username: 'testuser',
                password: 'newpassword123',
                user_type: 'admin',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should update a user and return 200', async () => {
        userRepository.findOneByUsername.mockResolvedValue(req.body);
        userRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
        userRepository.findOneByUsername.mockResolvedValue(req.body);

        await updateUserHandler.handleRequest(req as Request, res as Response);

        expect(userRepository.findOneByUsername).toHaveBeenCalledWith('testuser');
        expect(userRepository.update).toHaveBeenCalledWith('testuser', req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return 404 if user is not found', async () => {
        userRepository.findOneByUsername.mockResolvedValue(undefined);

        await updateUserHandler.handleRequest(req as Request, res as Response);

        expect(userRepository.findOneByUsername).toHaveBeenCalledWith('testuser');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
});