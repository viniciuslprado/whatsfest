import express, { Router } from 'express';
import festaController from '../controllers/festaController';
import authAdmin from '../middlewares/authAdmin';

const router: Router = express.Router();

// Rota pública para listar todas as festas
router.get('/', festaController.listarFestas);

// Rotas temporariamente sem autenticação para teste
router.post('/', festaController.criarFesta);
router.put('/:id', festaController.atualizarFesta);
router.patch('/:id', festaController.atualizarFesta);
router.delete('/:id', festaController.deletarFesta);

export default router;