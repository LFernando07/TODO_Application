import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = ((req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded; // GUARDAR el usuario aquí
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
})



