import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// Interface para Flyer
interface Flyer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkVendas?: string;
  destaque: boolean;
  dataEvento?: string;
  cidade?: string;
  createdAt: string;
}

// Caminho para arquivo JSON que armazena os flyers
const flyersFilePath = path.join(__dirname, '../../data/flyers.json');

// Função para garantir que o diretório e arquivo existem
const ensureFlyersFile = () => {
  const dataDir = path.dirname(flyersFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(flyersFilePath)) {
    fs.writeFileSync(flyersFilePath, JSON.stringify([]));
  }
};

// Função para ler flyers do arquivo
const readFlyers = (): Flyer[] => {
  ensureFlyersFile();
  try {
    const data = fs.readFileSync(flyersFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Função para salvar flyers no arquivo
const saveFlyers = (flyers: Flyer[]) => {
  ensureFlyersFile();
  fs.writeFileSync(flyersFilePath, JSON.stringify(flyers, null, 2));
};

// GET - Listar todos os flyers
router.get('/', (req: Request, res: Response) => {
  try {
    const flyers = readFlyers();
    res.json({ success: true, flyers });
  } catch (error) {
    console.error('Erro ao listar flyers:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo flyer
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, imageUrl, linkVendas, destaque, dataEvento, cidade } = req.body;
    
    if (!title || !imageUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'Título e imagem são obrigatórios' 
      });
    }

    const flyers = readFlyers();
    const newFlyer: Flyer = {
      id: Date.now().toString(),
      title,
      description: description || '',
      imageUrl,
      linkVendas: linkVendas || '',
      destaque: destaque || false,
      dataEvento: dataEvento || '',
      cidade: cidade || '',
      createdAt: new Date().toISOString()
    };

    flyers.push(newFlyer);
    saveFlyers(flyers);

    res.status(201).json({ success: true, flyer: newFlyer });
  } catch (error) {
    console.error('Erro ao criar flyer:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar flyer
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, linkVendas, destaque, dataEvento, cidade } = req.body;
    
    const flyers = readFlyers();
    const flyerIndex = flyers.findIndex(f => f.id === id);
    
    if (flyerIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Flyer não encontrado' 
      });
    }

    flyers[flyerIndex] = {
      ...flyers[flyerIndex],
      title: title || flyers[flyerIndex].title,
      description: description || flyers[flyerIndex].description,
      imageUrl: imageUrl || flyers[flyerIndex].imageUrl,
      linkVendas: linkVendas || flyers[flyerIndex].linkVendas,
      destaque: destaque !== undefined ? destaque : flyers[flyerIndex].destaque,
      dataEvento: dataEvento || flyers[flyerIndex].dataEvento,
      cidade: cidade || flyers[flyerIndex].cidade
    };

    saveFlyers(flyers);

    res.json({ success: true, flyer: flyers[flyerIndex] });
  } catch (error) {
    console.error('Erro ao atualizar flyer:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// DELETE - Deletar flyer
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const flyers = readFlyers();
    const flyerIndex = flyers.findIndex(f => f.id === id);
    
    if (flyerIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Flyer não encontrado' 
      });
    }

    const deletedFlyer = flyers.splice(flyerIndex, 1)[0];
    saveFlyers(flyers);

    res.json({ success: true, message: 'Flyer deletado com sucesso', flyer: deletedFlyer });
  } catch (error) {
    console.error('Erro ao deletar flyer:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// GET - Listar apenas flyers em destaque
router.get('/featured', (req: Request, res: Response) => {
  try {
    const flyers = readFlyers();
    const featuredFlyers = flyers.filter(flyer => flyer.destaque);
    res.json({ success: true, flyers: featuredFlyers });
  } catch (error) {
    console.error('Erro ao listar flyers em destaque:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

export default router;