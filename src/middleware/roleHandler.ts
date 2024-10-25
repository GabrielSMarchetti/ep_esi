import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Roles } from '../config/Roles';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET_KEY as string;

declare module 'express-serve-static-core' {
    interface Request {
        decodedJwt?: JwtPayload;
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            res.status(500).json({ message: 'Failed to authenticate token' });
            return;
        }

        req.decodedJwt = decoded as JwtPayload;
        next();
    });
}

export function checkRole(authorizedRoles: Roles[] | Roles) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const decoded = req.decodedJwt;
        if (!decoded) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        const userRoles: Array<string> = decoded.roles;
        const rolesToCheck = Array.isArray(authorizedRoles) ? authorizedRoles : [authorizedRoles];

        const hasRole = rolesToCheck.some(role => userRoles.includes(role));
        if (!hasRole) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        next();
    };
}