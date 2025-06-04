import express from 'express'
import { UserController } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authCors.js'

export const userRoute = () => {
  const router = express.Router()

  router.post('/', UserController.createUser)
  router.get('/:id', authMiddleware, UserController.getUserById)
  router.put('/:id', authMiddleware, UserController.updateUser)
  router.delete('/:id', authMiddleware, UserController.deleteUser)

  return router;

}