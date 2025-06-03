import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = ((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
      req.session.user = data;
    } catch (error) {
      res.json({ error: 'Invalid Token' });
    }
  }

  next();

  // const token = req.cookies.access_token;

  // if (!token) {
  //   return res.status(401).json({ error: 'No token provided' });
  // }

  // try {
  //   const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
  //   req.user = data; // Usuario autenticado disponible en req.user
  //   next();
  // } catch (error) {
  //   return res.status(401).json({ error: 'Invalid Token' });
  // }
})



