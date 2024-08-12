import { Pool } from 'mysql2/promise';

// Suponha que você tenha uma conexão com o banco de dados
const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'taskdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export interface Task {
    title: string;
    description: string;
    category: string;
}

class TaskModel {
    static async create(userId: number, title: string, description: string, category: string): Promise<any> {
        const [result] = await pool.query('INSERT INTO tasks (userId, title, description, category) VALUES (?, ?, ?, ?)', [userId, title, description, category]);
        return result;
    }

    static async findByUserId(userId: number): Promise<any[]> {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE userId = ?', [userId]);
        return rows;
    }

    static async updateStatus(id: number, status: string): Promise<any> {
        const [result] = await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
        return result;
    }

    static async delete(id: number): Promise<any> {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result;
    }
}

export default TaskModel;
