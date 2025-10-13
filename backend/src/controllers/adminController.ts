import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_default';

export const adminLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
  }

  // Gera um token JWT simples
  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '2h' });
  return res.json({ token });
};
