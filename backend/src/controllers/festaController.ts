import { Request, Response } from 'express';
import festaService from '../services/festaService';
import { ICreateFestaRequest } from '../types/festa.types';

const festaController = {
  // Rota pública para listar todas as festas
  async listarFestas(req: Request, res: Response): Promise<void> {
    console.log('Iniciando listarFestas...');
    try {
      // Pega a cidade do usuário dos parâmetros da URL
      const cidadeUsuario = req.query.cidadeUsuario as string | undefined;
      console.log('Cidade usuario:', cidadeUsuario);
      
      console.log('Chamando festaService...');
      const festas = await festaService.listarFestas(cidadeUsuario);
      console.log('Festas obtidas:', festas.length);
      
      res.json(festas);
    } catch (error) {
      console.error('Erro no controller listarFestas:', error);
      res.status(500).json({ error: 'Falha ao buscar os dados das festas.' });
    }
  },

  // Rota protegida para criar uma nova festa
  async criarFesta(req: Request<{}, any, ICreateFestaRequest>, res: Response): Promise<void> {
    try {
      const novaFesta = await festaService.criarFesta(req.body);
      res.status(201).json(novaFesta); // 201: Criado
    } catch (error) {
      console.error('Erro no controller criarFesta:', error);
      res.status(500).json({ error: 'Falha ao salvar a nova festa.' });
    }
  },

  // Rota Protegida para Atualizar (PATCH)
  async atualizarFesta(req: Request<{ id: string }, any, Partial<ICreateFestaRequest>>, res: Response): Promise<Response | void> {
    const id = req.params.id; // ID vem da URL (ex: /festas/123)
    try {
      const festaAtualizada = await festaService.atualizarFesta(id, req.body);
      res.json(festaAtualizada);
    } catch (error) {
      console.error('Erro no controller atualizarFesta:', error);
      // Se a festa não for encontrada, retorna 404
      if (error instanceof Error && error.message.includes('não encontrada')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Falha ao atualizar a festa.' });
    }
  },

  // Rota Protegida para Deletar (DELETE)
  async deletarFesta(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    try {
      await festaService.deletarFesta(id);
      // Retorna 204: No Content (sucesso sem corpo de resposta)
      res.status(204).send(); 
    } catch (error) {
      console.error('Erro no controller deletarFesta:', error);
      if (error instanceof Error && error.message.includes('não encontrada')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Falha ao deletar a festa.' });
    }
  }
};

export default festaController;