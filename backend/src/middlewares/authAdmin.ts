import { Request, Response, NextFunction } from 'express';

// Middleware para verificar se o usuário tem permissão de admin
export const authAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log('🔐 Middleware authAdmin - verificando autenticação...');
    console.log('📝 Headers recebidos:', req.headers);
    
    // Pega a chave de admin do cabeçalho Authorization
    const adminKey = req.headers.authorization;
    console.log('🔑 Chave recebida:', adminKey);
    
    // Verifica se a chave foi fornecida
    if (!adminKey) {
      console.log('❌ Nenhuma chave fornecida');
      res.status(401).json({ 
        error: 'Chave de administrador não fornecida',
        message: 'É necessário fornecer a chave de admin no cabeçalho Authorization'
      });
      return;
    }

    // Verifica se a chave está correta
    const expectedAdminKey = process.env.ADMIN_KEY || "ChaveDeAcesso-festa17-J8kF%9zWp$rV3hL6sX";
    console.log('🎯 Chave esperada:', expectedAdminKey);
    
    if (adminKey !== expectedAdminKey) {
      console.log('❌ Chave inválida');
      res.status(403).json({ 
        error: 'Chave de administrador inválida',
        message: 'A chave fornecida não é válida para operações administrativas'
      });
      return;
    }

    console.log('✅ Autenticação bem-sucedida');
    // Se chegou até aqui, a autenticação foi bem-sucedida
    next();
  } catch (error) {
    console.error('❌ Erro no middleware authAdmin:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Falha na verificação de autenticação'
    });
  }
};

export default authAdmin;