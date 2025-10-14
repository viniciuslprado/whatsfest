import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import flyerRoutes from './routes/flyerRoutes';
import festaRoutes from './routes/festaRoutes';
import cidadeRoutes from './routes/cidadeRoutes';
import adminRoutes from './routes/adminRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Servir arquivos estáticos dos flyers
app.use('/uploads/flyers', express.static(path.join(__dirname, '../../uploads/flyers')));

// Rotas modularizadas
app.use('/uploads/flyers', express.static(path.join(__dirname, '../../uploads/flyers')));
app.use('/api/v1/flyers', flyerRoutes);
app.use('/api/v1/festas', festaRoutes);
app.use('/api/v1', cidadeRoutes);
app.use('/api/v1/admin', adminRoutes);


// Teste
app.get("/", (req, res) => {
  res.send("API OK");
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

prisma.$connect().then(() => console.log("Banco conectado"));
