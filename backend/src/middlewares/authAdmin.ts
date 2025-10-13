import { Request, Response, NextFunction } from 'express';import { Request, Response, NextFunction } from 'express';



export function authAdmin(req: Request, res: Response, next: NextFunction) {// Middleware para verificar se o usuário tem permissão de admin

  const key = req.headers['authorization'];export const authAdmin = (req: Request, res: Response, next: NextFunction): void => {

  if (!key || key !== process.env.ADMIN_SECRET_KEY) {  try {

    return res.status(401).json({ error: 'Não autorizado' });    // Pega a chave de admin do cabeçalho Authorization

  }    const adminKey = req.headers.authorization;

  next();    

}    // Verifica se a chave foi fornecida

    if (!adminKey) {
      res.status(401).json({ 
        error: 'Chave de administrador não fornecida',
        message: 'É necessário fornecer a chave de admin no cabeçalho Authorization'
      });
      return;
    }

    // Verifica se a chave está correta
    const expectedAdminKey = process.env.ADMIN_KEY || "ChaveDeAcesso-festa17-J8kF%9zWp$rV3hL6sX";
    
    if (adminKey !== expectedAdminKey) {
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