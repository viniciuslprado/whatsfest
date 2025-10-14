import express from 'express';
import { adminLogin } from '../controllers/adminController';

const router = express.Router();

// Rota de login admin
router.post('/login', adminLogin);

export default router;
