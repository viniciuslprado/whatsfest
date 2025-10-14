import express from 'express';
import cidadesData from '../data/cidadesBrasil.js';

const router = express.Router();

// Rota para autocomplete de cidades
router.get('/geolocation/cities', (req, res) => {
  const search = (req.query.search || '').toString().toLowerCase();
  if (!search || search.length < 2) return res.json([]);
  const cidadesEstaticas = cidadesData.cidadesEstaticas;
  const results = cidadesEstaticas
    .filter((c) =>
      `${c.nome} (${c.estado})`.toLowerCase().includes(search)
    )
    .map((c) => `${c.nome} (${c.estado})`)
    .slice(0, 10);
  res.json(results);
});

export default router;
