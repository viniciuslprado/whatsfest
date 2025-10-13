import { PrismaClient } from '@prisma/client';
import { ICreateFestaRequest } from '../types/festa.types';

const prisma = new PrismaClient();

const festaService = {
  // Buscar todas as festas, priorizando por localização se fornecida
  async listarFestas(cidadeUsuario?: string) {
    try {
      const festas = await prisma.festa.findMany({
        orderBy: [
          { destaque: 'desc' }, // Eventos em destaque primeiro
          { data: 'asc' },      // Depois por data
          { horaInicio: 'asc' } // E por horário
        ]
      });

      // Se cidade do usuário for fornecida, priorizar eventos da mesma cidade
      if (cidadeUsuario) {
        const festasLocais = festas.filter((festa: any) => 
          festa.cidade.toLowerCase().includes(cidadeUsuario.toLowerCase())
        );
        const festasOutras = festas.filter((festa: any) => 
          !festa.cidade.toLowerCase().includes(cidadeUsuario.toLowerCase())
        );
        return [...festasLocais, ...festasOutras];
      }

      return festas;
    } catch (error) {
      console.error('Erro no service listarFestas:', error);
      throw new Error('Falha ao buscar festas do banco de dados');
    }
  },

  // Criar uma nova festa
  async criarFesta(dadosFesta: ICreateFestaRequest) {
    try {
      console.log('📝 Service criarFesta - dados recebidos:', dadosFesta);
      
      // Processar data se fornecida
      let dataProcessada = null;
      if (dadosFesta.data) {
        // Converter string de data para DateTime preservando timezone local
        const [year, month, day] = dadosFesta.data.split('-').map(Number);
        dataProcessada = new Date(year, month - 1, day);
        console.log('📅 Data processada:', dataProcessada);
      }

      console.log('💾 Tentando criar festa no banco...');
      const novaFesta = await prisma.festa.create({
        data: {
          nome: dadosFesta.nome,
          data: dataProcessada,
          horaInicio: dadosFesta.horaInicio || null,
          horaFim: dadosFesta.horaFim || null,
          cidade: dadosFesta.cidade,
          local: dadosFesta.local || null,
          urlImagemFlyer: dadosFesta.urlImagemFlyer || null,
          linkVendas: dadosFesta.linkVendas || null,
          descricaoCurta: dadosFesta.descricaoCurta || null,
          destaque: dadosFesta.destaque || false
        }
      });
      console.log('✅ Festa criada no banco:', novaFesta);
      return novaFesta;
    } catch (error) {
      console.error('❌ Erro no service criarFesta:', error);
      console.error('❌ Stack trace do service:', (error as Error).stack);
      throw new Error('Falha ao criar festa no banco de dados');
    }
  },

  // Atualizar uma festa existente
  async atualizarFesta(id: string, dadosAtualizacao: Partial<ICreateFestaRequest>) {
    try {
      // Verificar se a festa existe
      const festaExistente = await prisma.festa.findUnique({
        where: { id: parseInt(id) }
      });

      if (!festaExistente) {
        throw new Error('Festa não encontrada');
      }

      // Preparar dados para atualização
      const dadosParaAtualizar: any = {};
      
      if (dadosAtualizacao.nome !== undefined) dadosParaAtualizar.nome = dadosAtualizacao.nome;
      if (dadosAtualizacao.data !== undefined) {
        // Processar data se fornecida
        if (dadosAtualizacao.data) {
          const [year, month, day] = dadosAtualizacao.data.split('-').map(Number);
          dadosParaAtualizar.data = new Date(year, month - 1, day);
        } else {
          dadosParaAtualizar.data = null;
        }
      }
      if (dadosAtualizacao.horaInicio !== undefined) dadosParaAtualizar.horaInicio = dadosAtualizacao.horaInicio || null;
      if (dadosAtualizacao.horaFim !== undefined) dadosParaAtualizar.horaFim = dadosAtualizacao.horaFim || null;
      if (dadosAtualizacao.cidade !== undefined) dadosParaAtualizar.cidade = dadosAtualizacao.cidade;
      if (dadosAtualizacao.local !== undefined) dadosParaAtualizar.local = dadosAtualizacao.local;
      if (dadosAtualizacao.urlImagemFlyer !== undefined) dadosParaAtualizar.urlImagemFlyer = dadosAtualizacao.urlImagemFlyer;
      if (dadosAtualizacao.linkVendas !== undefined) dadosParaAtualizar.linkVendas = dadosAtualizacao.linkVendas;
      if (dadosAtualizacao.descricaoCurta !== undefined) dadosParaAtualizar.descricaoCurta = dadosAtualizacao.descricaoCurta;
      if (dadosAtualizacao.destaque !== undefined) dadosParaAtualizar.destaque = dadosAtualizacao.destaque;

      const festaAtualizada = await prisma.festa.update({
        where: { id: parseInt(id) },
        data: dadosParaAtualizar
      });

      return festaAtualizada;
    } catch (error) {
      console.error('Erro no service atualizarFesta:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha ao atualizar festa no banco de dados');
    }
  },

  // Deletar uma festa
  async deletarFesta(id: string) {
    try {
      // Verificar se a festa existe
      const festaExistente = await prisma.festa.findUnique({
        where: { id: parseInt(id) }
      });

      if (!festaExistente) {
        throw new Error('Festa não encontrada');
      }

      await prisma.festa.delete({
        where: { id: parseInt(id) }
      });

      return true;
    } catch (error) {
      console.error('Erro no service deletarFesta:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha ao deletar festa no banco de dados');
    }
  }
};

export default festaService;