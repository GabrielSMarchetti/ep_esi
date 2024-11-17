import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedJWTToken } from '../interfaces/IDecodedJWTToken';
import { Roles } from '../config/Roles';


export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const jwtSecret = process.env.JWT_SECRET_KEY as jwt.PublicKey;
    const token = req.headers['authorization'] as string;
    if (!token) {
        res.status(403).json({ message: 'No token provided' });
        return;
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            res.status(500).json({ message: 'Failed to authenticate token' });
            return;
        }

        req.decodedJwt = decoded as IDecodedJWTToken;
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