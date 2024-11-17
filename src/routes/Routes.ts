import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { UserController } from '../controllers/UserController';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Report } from '../entities/Report';
import { asyncErrorHandler } from '../middleware/ErrorHandler';
import { RepositoryManager } from '../infra/RepositoryManager';
import { LoginController } from '../controllers/LoginController';
import { StudentController } from '../controllers/StudentController';
import { ReportController } from '../controllers/ReportController';
import { verifyToken } from '../middleware/roleHandler';

export function initializeRouter(){
    const router = express.Router();
    const repositoryManager = RepositoryManager.getInstance();

    const loginController = new LoginController(repositoryManager.getRepository(User));
    const userController = new UserController(repositoryManager.getRepository(User));
    const studentController = new StudentController(repositoryManager.getRepository(Student));
    const reportController = new ReportController(repositoryManager.getRepository(Report), repositoryManager.getRepository(User));

    router.get('/', (req, res) => {
        res.send('Hello World!');
    });

    router.post('/login', asyncErrorHandler(async (req: Request, res: Response) =>
        await loginController.create(req, res)));

    router.post('/users', asyncErrorHandler(async (req: Request, res: Response) =>
            await userController.create(req, res)));

    router.get('/users', asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.getAllUsers(req, res)));

    router.get('/users/mentors', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.getAllMentors(req, res)));

    router.get('/users/:username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.getUserByUsername(req, res)));

    router.put('/users/:username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.update(req, res)));

    router.post('/students', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.create(req, res)));

    router.get('/students', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.getAllStudents(req, res)));

    router.get('/students/mentor/:mentor', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.getByMentor(req, res)));

    router.put('/students/:username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.update(req, res)));

    router.post('/report', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.create(req, res)));

    router.get('/report', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getAllReports(req, res)));

    router.get('/report/student/:student', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getByStudent(req, res)));

    router.get('/report/mentor/:mentor', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getByMentor(req, res)));

    router.put('/report/update-mentor-feedback/:student', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.updateMentorFeedback(req, res)));

    router.put('/report/update-coordinator-feedback/:student', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.updateCoordinatorFeedback(req, res)));
    return router;
}