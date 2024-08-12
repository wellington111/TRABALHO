import { Request, Response } from 'express';
import TaskModel, { Task } from '../models/taskModel';

// Função para criar uma nova tarefa
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, category } = req.body as Task;
        const userId = req.userId as number;

        if (!userId) {
            res.status(401).json({ message: 'User ID is missing' });
            return;
        }

        const result = await TaskModel.create(userId, title, description, category);
        res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ message: 'Error creating task' });
    }
};

// Função para listar as tarefas do usuário
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId as number;

        if (!userId) {
            res.status(401).json({ message: 'User ID is missing' });
            return;
        }

        const tasks = await TaskModel.findByUserId(userId);
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err.message);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

// Função para atualizar o status de uma tarefa
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body as { status: string };

        const result = await TaskModel.updateStatus(parseInt(id), status);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (err) {
        console.error('Error updating task status:', err.message);
        res.status(500).json({ message: 'Error updating task status' });
    }
};

// Função para excluir uma tarefa
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const result = await TaskModel.delete(parseInt(id));

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err.message);
        res.status(500).json({ message: 'Error deleting task' });
    }
};