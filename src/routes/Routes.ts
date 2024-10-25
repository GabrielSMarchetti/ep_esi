import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { UserController } from '../controllers/UserController';
import { User } from '../entities/User';
import { asyncErrorHandler } from '../middleware/ErrorHandler';
import { RepositoryManager } from '../infra/RepositoryManager';

const router = express.Router();
const repositoryManager = RepositoryManager.getInstance();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/users/:username?', asyncErrorHandler(async (req: Request, res: Response) =>
    await new UserController(repositoryManager.getRepository(User))
    .getUserByUsername(req, res)));

router.post('/users', asyncErrorHandler(async (req: Request, res: Response) =>
    await new UserController(repositoryManager.getRepository(User))
    .createOrUpdate(req, res)));

export default router;