import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authCors.js';

export const authRoute = () => {
  const router = express.Router();

  router.post('/login', AuthController.loginUser);
  router.post('/logout', AuthController.logoutUser);
  router.get('/protected', authMiddleware, AuthController.profileUser)

  return router;
}