import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ADMIN_SECRET_KEY || 'default_jwt_secret';

// Middleware para verificar se o usuário tem permissão de admin via JWT
const authAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({
        error: 'Token não fornecido',
        message: 'É necessário fornecer o token JWT no cabeçalho Authorization'
      });
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET);
    // Se chegou até aqui, o token é válido
    next();
  } catch (error) {
    console.error('Erro no middleware authAdmin:', error);
    res.status(401).json({
      error: 'Token inválido ou expirado',
      message: 'Você não tem permissão para acessar esta rota'
    });
    return;
  }
};

export default authAdmin;