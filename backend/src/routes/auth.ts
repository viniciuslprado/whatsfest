import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Interface para request de login
interface LoginRequest {
  username: string;
  password: string;
}

// Endpoint de login do admin
router.post('/login', (req: Request, res: Response) => {
  try {
    const { username, password }: LoginRequest = req.body;

    // Validação básica
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username e password são obrigatórios' 
      });
    }

    // Verificar credenciais (você pode configurar estas no .env)
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Retorna a chave de admin para usar nas próximas requisições
      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        adminKey: process.env.ADMIN_SECRET_KEY
      });
    } else {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

export default router;