import express, { Router } from 'express';
import festaController from '../controllers/festaController';
import authAdmin from '../middlewares/authAdmin';

const router: Router = express.Router();

// Rota pública para listar todas as festas
router.get('/', festaController.listarFestas);

// Rotas protegidas (requerem chave de admin)
router.post('/', authAdmin, festaController.criarFesta);
router.put('/:id', authAdmin, festaController.atualizarFesta);
router.patch('/:id', authAdmin, festaController.atualizarFesta);
router.delete('/:id', authAdmin, festaController.deletarFesta);

export default router;