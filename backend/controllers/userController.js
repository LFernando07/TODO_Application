import { PrismaClient } from "@prisma/client";
import { handleException } from '../common/handle_request.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


const prisma = new PrismaClient();

export class UserController {

  static getUserById = handleException(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);


  })

  static createUser = handleException(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validar tipos de datos
    // Asegurarse de que los campos sean cadenas de texto
    if (typeof name !== 'string' || typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid data types' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // hash password (you can use bcrypt or any other library)
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    // retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  })

  static updateUser = handleException(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { name, username, email, password } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validaciones solo si se envían los campos
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      // Validar unicidad de email
      const emailUser = await prisma.user.findUnique({
        where: { email },
      });
      if (emailUser && emailUser.id !== userId) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    if (username) {
      if (typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username type' });
      }
      // Validar unicidad de username
      const usernameUser = await prisma.user.findUnique({
        where: { username },
      });
      if (usernameUser && usernameUser.id !== userId) {
        return res.status(409).json({ error: 'Username already in use' });
      }
    }

    if (password && password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Update user
    const updatedData = {};
    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    // retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  })

  static deleteUser = handleException(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).send();
  })

}