import express, { Request, Response, Router } from 'express';
import { 
  IFesta, 
  ICreateFestaRequest, 
  IUpdateFestaRequest, 
  IFestaParams,
  IListFestaResponse,
  ISingleFestaResponse
} from '../types/festa.types';

const router: Router = express.Router();

// Array vazio - sem dados de teste
const festasMock: IFesta[] = [];

// GET /api/v1/festas - Listar todas as festas
router.get('/', (req: Request, res: Response<IFesta[]>) => {
  try {
    // Aplicar ordenação por cidade se fornecida
    const cidadeUsuario = req.query.cidadeUsuario as string;
    let festasOrdenadas = [...festasMock];
    
    if (cidadeUsuario) {
      festasOrdenadas.sort((a, b) => {
        const aIsLocal = a.cidade.toLowerCase() === cidadeUsuario.toLowerCase();
        const bIsLocal = b.cidade.toLowerCase() === cidadeUsuario.toLowerCase();
        
        if (aIsLocal && !bIsLocal) return -1;
        if (!aIsLocal && bIsLocal) return 1;
        return 0;
      });
    }
    
    res.json(festasOrdenadas);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao listar festas:', errorMessage);
    res.status(500).json([]);
  }
});

// GET /api/v1/festas/:id - Buscar festa por ID
router.get('/:id', (req: Request<IFestaParams>, res: Response) => {
  try {
    const { id } = req.params;
    const festaId = parseInt(id, 10);
    
    if (isNaN(festaId)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Deve ser um número.'
      });
    }
    
    const festa = festasMock.find(f => f.id === festaId);
    
    if (!festa) {
      return res.status(404).json({
        success: false,
        message: 'Festa não encontrada'
      });
    }
    
    res.json(festa);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar festa:', errorMessage);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: errorMessage
    });
  }
});

// POST /api/v1/festas - Criar nova festa
router.post('/', (req: Request, res: Response) => {
  try {
    const { nome, dataHora, cidade, local, urlImagemFlyer, linkVendas, descricaoCurta, destaque } = req.body;
    
    // Validação básica
    if (!nome || !dataHora || !cidade) {
      return res.status(400).json({
        success: false,
        message: 'Nome, dataHora e cidade são obrigatórios'
      });
    }
    
    // Validar formato de data ISO
    if (!isValidISODate(dataHora)) {
      return res.status(400).json({
        success: false,
        message: 'dataHora deve estar no formato ISO 8601 (ex: 2025-10-15T20:00:00.000Z)'
      });
    }
    
    const novaFesta: IFesta = {
      id: Date.now(), // ID temporário
      nome,
      dataHora,
      cidade,
      local,
      urlImagemFlyer: urlImagemFlyer || 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto',
      linkVendas,
      descricaoCurta,
      destaque: destaque || false,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };
    
    // Adicionar à lista mock
    festasMock.push(novaFesta);
    
    res.status(201).json({
      success: true,
      data: novaFesta,
      message: 'Festa criada com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao criar festa:', errorMessage);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: errorMessage
    });
  }
});

// PUT /api/v1/festas/:id - Atualizar festa
router.put('/:id', (req: Request<IFestaParams>, res: Response) => {
  try {
    const { id } = req.params;
    const festaId = parseInt(id, 10);
    
    if (isNaN(festaId)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Deve ser um número.'
      });
    }
    
    const festaIndex = festasMock.findIndex(f => f.id === festaId);
    
    if (festaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Festa não encontrada'
      });
    }
    
    const updateData = req.body;
    
    // Validar dataHora se fornecida
    if (updateData.dataHora && !isValidISODate(updateData.dataHora)) {
      return res.status(400).json({
        success: false,
        message: 'dataHora deve estar no formato ISO 8601'
      });
    }
    
    // Atualizar festa
    const festaAtualizada: IFesta = {
      ...festasMock[festaIndex],
      ...updateData,
      atualizadoEm: new Date()
    };
    
    festasMock[festaIndex] = festaAtualizada;
    
    res.json({
      success: true,
      data: festaAtualizada,
      message: 'Festa atualizada com sucesso'
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao atualizar festa:', errorMessage);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: errorMessage
    });
  }
});

// DELETE /api/v1/festas/:id - Deletar festa
router.delete('/:id', (req: Request<IFestaParams>, res: Response) => {
  try {
    const { id } = req.params;
    const festaId = parseInt(id, 10);
    
    if (isNaN(festaId)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido. Deve ser um número.'
      });
    }
    
    const festaIndex = festasMock.findIndex(f => f.id === festaId);
    
    if (festaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Festa não encontrada'
      });
    }
    
    // Remover festa
    festasMock.splice(festaIndex, 1);
    
    res.json({
      success: true,
      message: `Festa ${festaId} deletada com sucesso`
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao deletar festa:', errorMessage);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: errorMessage
    });
  }
});

// Função auxiliar para validar data ISO
function isValidISODate(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && dateString.includes('T');
  } catch {
    return false;
  }
}

export default router;