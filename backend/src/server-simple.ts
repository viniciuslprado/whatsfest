import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Rota raiz chamada');
  res.json({ message: 'API funcionando!' });
});

app.get('/api/v1/festas', (req, res) => {
  console.log('Rota festas chamada');
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`Servidor simples rodando na porta ${PORT}`);
});