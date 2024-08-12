import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        
        const payload = decoded as JwtPayload;
        req.userId = payload.id;
        next();
    });
}
