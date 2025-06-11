import express from 'express';
import { TaskController } from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authCors.js';

export const taskRoute = () => {
  const router = express.Router()

  router.get('/:id', authMiddleware, TaskController.getAllTasksByUser)
  router.post('/', authMiddleware, TaskController.createTask);
  router.put('/:id', authMiddleware, TaskController.updateTask);
  router.delete('/:id', authMiddleware, TaskController.deleteTask);
  router.put('/complete/:id', authMiddleware, TaskController.changeTaskStatus);
  router.get('/tasks', authMiddleware, TaskController.getfilteredTasks);

  return router;
}