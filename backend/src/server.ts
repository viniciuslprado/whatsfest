// Arquivo: backend/src/server.ts
// ----------------------------------------------------

// 1. Importações e Configurações
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// Importar rotas mock (atual) ou rotas com controller e Prisma
// import festaRoutes from './routes/festaRoutes'; // Mock data
import festaRoutes from './routes/festaRoutesWithController'; // Com Prisma (usando controller e service)
import geolocationRoutes from './routes/geolocation';
import uploadRoutes from './routes/uploads';
import flyersRoutes from './routes/flyers';
import authRoutes from './routes/auth';
import path from 'path';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 3000;

// Middlewares
app.use(express.json());

// CORS configuration for Vercel frontend
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'http://localhost:3001', // Alternative dev port
  'https://whatsfest.vercel.app', // Vercel production
  process.env.FRONTEND_URL // Environment variable
].filter((origin): origin is string => Boolean(origin));

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed or is a Vercel preview deployment
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 2. ROTAS
// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API de Festas está rodando com TypeScript!');
});

// Todas as rotas de festas começarão com /api/v1/festas
app.use('/api/v1/festas', festaRoutes);

// Rotas de geolocalização
app.use('/api/v1/geolocation', geolocationRoutes);

// Rotas de upload de imagens
app.use('/api/v1/uploads', uploadRoutes);

// Rotas de flyers
app.use('/api/v1/flyers', flyersRoutes);

// Rotas de autenticação
app.use('/api/v1/auth', authRoutes);

// 3. Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 4. Middleware para rotas não encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// 5. Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor TypeScript rodando na porta ${PORT}`);
  console.log(`📋 Acesse: http://localhost:${PORT}`);
  console.log(`📊 API Festas: http://localhost:${PORT}/api/v1/festas`);
});