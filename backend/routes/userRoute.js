import express from 'express'
import { UserController } from '../controllers/userController.js'

export const userRoute = () => {
  const router = express.Router()

  router.get('/:id', UserController.getUserById)
  router.post('/', UserController.createUser)
  router.put('/:id', UserController.updateUser)
  router.delete('/:id', UserController.deleteUser)

  return router;

}