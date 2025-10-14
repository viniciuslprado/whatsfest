import express from 'express';
import { PrismaClient } from '@prisma/client';
import authAdmin from '../middlewares/authAdmin';

const router = express.Router();
const prisma = new PrismaClient();

// GET todas as festas
router.get('/', async (req, res) => {
  try {
    const festas = await prisma.festa.findMany({
      orderBy: [
        { destaque: 'desc' },
        { data: 'asc' },
        { horaInicio: 'asc' }
      ]
    });
    res.json(festas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar festas' });
  }
});

// GET festa por id
router.get('/:id', async (req, res) => {
  try {
    const festa = await prisma.festa.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!festa) return res.status(404).json({ error: 'Festa não encontrada' });
    res.json(festa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar festa' });
  }
});

// POST criar festa (protegido)
router.post('/', authAdmin, async (req, res) => {
  try {
    const { nome, cidade, data, horaInicio, horaFim, local, linkVendas, descricaoCurta, destaque } = req.body;
    if (!nome || !cidade) return res.status(400).json({ error: 'Nome e cidade obrigatórios' });
    // Padroniza cidade para 'Nome (UF)'
    const cidadeFormatada = cidade.replace(/\s*-\s*/g, ' ').replace(/\s*\(([^)]+)\)$/,'').trim();
    const ufMatch = cidade.match(/\(([A-Z]{2})\)$/);
    const uf = ufMatch ? ufMatch[1] : '';
    const cidadeFinal = uf ? `${cidadeFormatada} (${uf})` : cidadeFormatada;
    let dataProcessada = null;
    if (data) {
      const [year, month, day] = data.split('-').map(Number);
      dataProcessada = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }
    const festa = await prisma.festa.create({
      data: {
        nome,
        cidade: cidadeFinal,
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
    res.status(500).json({ error: 'Erro ao criar festa' });
  }
});

// PUT atualizar festa (protegido)
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { nome, cidade, data, horaInicio, horaFim, local, linkVendas, descricaoCurta, destaque } = req.body;
    let dataProcessada = null;
    if (data) {
      const [year, month, day] = data.split('-').map(Number);
      dataProcessada = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }
    // Padroniza cidade para 'Nome (UF)'
    const cidadeFormatada = cidade.replace(/\s*-\s*/g, ' ').replace(/\s*\(([^)]+)\)$/,'').trim();
    const ufMatch = cidade.match(/\(([A-Z]{2})\)$/);
    const uf = ufMatch ? ufMatch[1] : '';
    const cidadeFinal = uf ? `${cidadeFormatada} (${uf})` : cidadeFormatada;
    const festa = await prisma.festa.update({
      where: { id: Number(req.params.id) },
      data: {
        nome,
        cidade: cidadeFinal,
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
    res.status(500).json({ error: 'Erro ao atualizar festa' });
  }
});

// DELETE festa (protegido)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await prisma.festa.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Festa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar festa' });
  }
});

export default router;
