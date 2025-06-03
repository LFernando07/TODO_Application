import express from 'express';
import { TaskController } from '../controllers/taskController.js';

export const taskRoute = () => {
  const router = express.Router()

  router.get('/:id', TaskController.getAllTasksByUser)
  router.post('/', TaskController.createTask);
  router.put('/:id', TaskController.updateTask);
  router.delete('/:id', TaskController.deleteTask);
  router.put('/complete/:id', TaskController.changeTaskStatus);

  return router;
}