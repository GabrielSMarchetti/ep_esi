import { Request, Response } from 'express';
import { Lo } from '../handlers/login_handler';

class LoginController {
    public static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        LoginHandler.handle(req, res);
    }
}

export default new LoginController();