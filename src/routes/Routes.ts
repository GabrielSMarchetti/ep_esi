import express, { Request, Response } from 'express';
import { asyncErrorHandler } from '../middleware/ErrorHandler';
import { verifyToken, checkRole } from '../middleware/roleHandler';
import { Roles } from '../config/Roles';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Report } from '../entities/Report';
import { LoginController } from '../controllers/LoginController';
import { UserController } from '../controllers/UserController';
import { StudentController } from '../controllers/StudentController';
import { ReportController } from '../controllers/ReportController';
import { RepositoryManager } from '../infra/RepositoryManager';

const repositoryManager = RepositoryManager.getInstance();
const userController = new UserController(repositoryManager.getRepository(User));
const studentController = new StudentController(repositoryManager.getRepository(Student));
const reportController = new ReportController(repositoryManager.getRepository(Report), repositoryManager.getRepository(Student));
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/login', asyncErrorHandler(async (req: Request, res: Response) =>
    await new LoginController(repositoryManager.getRepository(User))
    .create(req, res)));


router.put('/users/updateUser/:username', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await userController.update(req, res)));

router.post('/students/createStudent', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await studentController.create(req, res)));

router.get('/students', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await studentController.getAllStudents(req, res)));

router.get('/students/getByMentor/:mentor', verifyToken, checkRole([Roles.COORDENADOR, Roles.PROFESSOR]), asyncErrorHandler(async (req: Request, res: Response) =>
    await studentController.getByMentor(req, res)));

router.put('/students/updateStudent/:username', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await studentController.update(req, res)));

router.post('/report/createReport', verifyToken, checkRole(Roles.STUDENT), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.create(req, res)));

router.get('/report', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.getAllReports(req, res)));

router.get('/report/getByStudent/:student', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.getByStudent(req, res)));

router.get('/report/getByMentor/:mentor', verifyToken, checkRole([Roles.COORDENADOR, Roles.PROFESSOR]), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.getByMentor(req, res)));

router.put('/report/updateMentorAvaliation/:student', verifyToken, checkRole(Roles.PROFESSOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.updateMentorAvaliation(req, res)));

router.put('/report/updateMentorAvaliation/:student', verifyToken, checkRole(Roles.COORDENADOR), asyncErrorHandler(async (req: Request, res: Response) =>
    await reportController.updateMentorAvaliation(req, res)));

export default router;