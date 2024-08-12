import { Router } from 'express';
import { createTask, getUserTasks, updateTaskStatus, deleteTask } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();

router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, getUserTasks);
router.put('/tasks/:id/status', authMiddleware, updateTaskStatus);
router.delete('/tasks/:id', authMiddleware, deleteTask);

export default router;
