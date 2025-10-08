import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Extend Request interface for multer
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const router = Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadPath = path.join(__dirname, '../../uploads/flyers');
    // Garantir que a pasta existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `flyer-${uniqueSuffix}${ext}`);
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WebP.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// Endpoint para upload de imagem de flyer
router.post('/flyer-image', upload.single('flyerImage'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'Nenhuma imagem foi enviada' 
      });
    }

    // Retornar informações da imagem
    const imageUrl = `/uploads/flyers/${req.file.filename}`;
    
    res.json({
      message: 'Imagem enviada com sucesso!',
      imageUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Endpoint para deletar imagem de flyer
router.delete('/flyer-image/:fileName', (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../../uploads/flyers', fileName);

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ 
        error: 'Arquivo não encontrado' 
      });
    }

    // Deletar o arquivo
    fs.unlinkSync(filePath);

    res.json({ 
      message: 'Imagem deletada com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Endpoint para listar todas as imagens de flyers
router.get('/flyer-images', (req: Request, res: Response) => {
  try {
    const uploadsPath = path.join(__dirname, '../../uploads/flyers');
    
    if (!fs.existsSync(uploadsPath)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(uploadsPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    const images = imageFiles.map(file => {
      const filePath = path.join(uploadsPath, file);
      const stats = fs.statSync(filePath);
      
      return {
        fileName: file,
        imageUrl: `/uploads/flyers/${file}`,
        size: stats.size,
        uploadDate: stats.birthtime
      };
    });

    res.json({ images });

  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

export default router;