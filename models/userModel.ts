import db from '../db/db';
import bcrypt from 'bcryptjs';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}

const UserModel = {
    create: (username: string, email: string, password: string, callback: Function) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], callback);
    },

    findByEmail: (email: string, callback: Function) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    }
};

export default UserModel;
