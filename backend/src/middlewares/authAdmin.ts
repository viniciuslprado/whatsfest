import { Request, Response, NextFunction } from 'express';

// Middleware para verificar se o usuário tem permissão de admin
const authAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const adminKey = req.headers['authorization'];
    const expectedAdminKey = process.env.ADMIN_SECRET_KEY;

    if (!adminKey) {
      res.status(401).json({
        error: 'Chave de administrador não fornecida',
        message: 'É necessário fornecer a chave de admin no cabeçalho Authorization'
      });
      return;
    }

    if (!expectedAdminKey || adminKey !== expectedAdminKey) {
      res.status(403).json({
        error: 'Chave de administrador inválida',
        message: 'A chave fornecida não é válida para operações administrativas'
      });
      return;
    }

    // Se chegou até aqui, a autenticação foi bem-sucedida
    next();
  } catch (error) {
    console.error('Erro no middleware authAdmin:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Falha na verificação de autenticação'
    });
  }
};

export default authAdmin;