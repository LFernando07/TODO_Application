import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handleException } from "../common/handle_request.js"
import { PrismaClient } from "@prisma/client";

// Crear una instancia de PrismaClient
const prisma = new PrismaClient();
// New implementation test
// TODO: Request 3 times to login -> without banned user temporally 
const loginAttempts = {}; // -> Generate login attempts object 

export class AuthController {
  static loginUser = handleException(async (req, res) => {
    const { email, password } = req.body;

    // Limitar a 3 intentos por email
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 0, lastAttempt: new Date() };
    }
    if (loginAttempts[email].count >= 3) {
      return res.status(429).json({ error: 'Too many login attempts. Please try again later.' });
    }

    // General validations
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Si el usuario existe verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Incrementar el contador de intentos de inicio de sesión fallidos
      loginAttempts[email].count += 1;
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Login exitoso, reiniciar contador
    loginAttempts[email].count = 0;

    if (!process.env.SECRET_JWT_KEY) {
      return res.status(500).json({ error: 'JWT secret key not configured' });
    }

    // Si la contraseña es válida, generar un token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, username: user.username, email: user.email },
      process.env.SECRET_JWT_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // o 'Strict', según tus necesidades
      maxAge: 1000 * 60 * 60
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    })
  })

  static logoutUser = handleException(async (req, res) => {
    res
      .clearCookie('access_token')
      .json({ message: 'Logout successful' })
  })

  static profileUser = handleException(async (req, res) => {
    const user = req.user;
    if (!user) return res.status(403).json({ error: 'Access not authorized' });

    res.json({ user });
  })
}