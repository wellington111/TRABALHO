import { Request, Response } from 'express';
import UserModel, { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = (req: Request, res: Response): void => {
    const { username, email, password } = req.body as User;
    UserModel.create(username, email, password, (err: any, result: any) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered successfully');
    });
};

export const login = (req: Request, res: Response): void => {
    const { email, password } = req.body as User;
    UserModel.findByEmail(email, (err: any, results: any) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send('Email not found');

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Password incorrect');
        }

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
};
