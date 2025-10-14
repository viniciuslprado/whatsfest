import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Router } from 'express';
import authAdmin from '../middlewares/authAdmin';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/flyers');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload flyer
router.post('/api/v1/flyers', authAdmin, upload.single('flyer'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  res.status(201).json({ filename: req.file.filename, url: `/uploads/flyers/${req.file.filename}` });
});

// Listar flyers
router.get('/api/v1/flyers', (req, res) => {
  const dir = path.join(__dirname, '../../uploads/flyers');
  fs.readdir(dir, (err, files) => {
    if (err) return res.json([]);
    const flyers = files.map(f => ({ filename: f, url: `/uploads/flyers/${f}` }));
    res.json(flyers);
  });
});

// Excluir flyer
router.delete('/api/v1/flyers/:filename', authAdmin, (req, res) => {
  const file = path.join(__dirname, '../../uploads/flyers', req.params.filename);
  fs.unlink(file, err => {
    if (err) return res.status(404).json({ error: 'Arquivo não encontrado' });
    res.json({ message: 'Flyer excluído com sucesso' });
  });
});

export default router;
