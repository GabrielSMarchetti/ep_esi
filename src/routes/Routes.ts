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
import { checkRole, verifyToken } from '../middleware/roleHandler';
import { Roles } from '../config/Roles';

export function initializeRouter(){
    const router = express.Router();
    const repositoryManager = RepositoryManager.getInstance();

    const loginController = new LoginController(repositoryManager.getRepository(User));
    const userController = new UserController(repositoryManager.getRepository(User));
    const studentController = new StudentController(repositoryManager.getRepository(Student));
    const reportController = new ReportController(repositoryManager.getRepository(Report), repositoryManager.getRepository(Student));

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

    router.get('/users/by-username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.getUserByUsername(req, res)));

    router.put('/users/by-username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await userController.update(req, res)));

    router.post('/students', asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.create(req, res)));

    router.get('/students', asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.getAllStudents(req, res)));

    router.get('/students/mentor/by-mentor', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.getByMentor(req, res)));

    router.put('/students/by-username', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await studentController.update(req, res)));

    router.post('/report', verifyToken, checkRole(Roles.STUDENT), asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.create(req, res)));

    router.get('/report', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getAllReports(req, res)));

    router.get('/report/student/by-student', asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getByStudent(req, res)));

    router.get('/report/mentor/by-mentor', verifyToken, asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.getByMentor(req, res)));

    router.put('/report/update-mentor-feedback/by-student', verifyToken, checkRole(Roles.MENTOR),
        asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.updateMentorFeedback(req, res)));

    router.put('/report/update-coordinator-feedback/by-student', verifyToken, checkRole(Roles.COORDENADOR),
        asyncErrorHandler(async (req: Request, res: Response) =>
        await reportController.updateCoordinatorFeedback(req, res)));
    return router;
}