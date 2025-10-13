import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import festaRoutes from './routes/festaRoutesWithController';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 3000;

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API de Festas está rodando!');
});

// Rotas da API
app.use('/api/v1/festas', festaRoutes);
// app.use('/api/v1/geolocation', geolocationRoutes);
// app.use('/api/v1/uploads', uploadRoutes);
// app.use('/api/v1/flyers', flyersRoutes);
// app.use('/api/v1/auth', authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📋 Acesse: http://localhost:${PORT}`);
});