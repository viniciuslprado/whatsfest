import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authAdmin from './middlewares/authAdmin';
import { adminLogin } from './controllers/adminController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Rota de login admin
app.post('/api/v1/admin/login', adminLogin);


// Teste
app.get("/", (req, res) => {
  res.send("API OK");
});

// GET todas as festas
app.get("/api/v1/festas", async (req, res) => {
  try {
    const festas = await prisma.festa.findMany({
      orderBy: [
        { destaque: "desc" },
        { data: "asc" },
        { horaInicio: "asc" }
      ]
    });
    res.json(festas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar festas" });
  }
});

// GET festa por id
app.get("/api/v1/festas/:id", async (req, res) => {
  try {
    const festa = await prisma.festa.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!festa) return res.status(404).json({ error: "Festa não encontrada" });
    res.json(festa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar festa" });
  }
});

// POST criar festa (protegido)
app.post("/api/v1/festas", authAdmin, async (req, res) => {
  try {
    const { nome, cidade, data, horaInicio, horaFim, local, linkVendas, descricaoCurta, destaque } = req.body;
    if (!nome || !cidade) return res.status(400).json({ error: "Nome e cidade obrigatórios" });
    let dataProcessada = null;
    if (data) {
      const [year, month, day] = data.split("-").map(Number);
      dataProcessada = new Date(year, month - 1, day);
    }
    const festa = await prisma.festa.create({
      data: {
        nome,
        cidade,
        data: dataProcessada,
        horaInicio: horaInicio || null,
        horaFim: horaFim || null,
        local: local || null,
        linkVendas: linkVendas || null,
        descricaoCurta: descricaoCurta || null,
        destaque: destaque || false
      }
    });
    res.status(201).json(festa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar festa" });
  }
});

// PUT atualizar festa (protegido)
app.put("/api/v1/festas/:id", authAdmin, async (req, res) => {
  try {
    const { nome, cidade, data, horaInicio, horaFim, local, linkVendas, descricaoCurta, destaque } = req.body;
    let dataProcessada = null;
    if (data) {
      const [year, month, day] = data.split("-").map(Number);
      dataProcessada = new Date(year, month - 1, day);
    }
    const festa = await prisma.festa.update({
      where: { id: Number(req.params.id) },
      data: {
        nome,
        cidade,
        data: dataProcessada,
        horaInicio: horaInicio || null,
        horaFim: horaFim || null,
        local: local || null,
        linkVendas: linkVendas || null,
        descricaoCurta: descricaoCurta || null,
        destaque: destaque || false
      }
    });
    res.json(festa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar festa" });
  }
});

// DELETE festa (protegido)
app.delete("/api/v1/festas/:id", authAdmin, async (req, res) => {
  try {
    await prisma.festa.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Festa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar festa" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

prisma.$connect().then(() => console.log("Banco conectado"));
