import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.evento.deleteMany();
  console.log('🗑️ Dados antigos removidos');

  // Criar eventos de exemplo
  const eventos = [
    {
      nome: 'Festival de Música Eletrônica',
      descricao: 'Uma noite incrível com os melhores DJs da cidade! Música eletrônica, drinks especiais e muita diversão.',
      dataHora: new Date('2024-02-15T22:00:00Z'),
      local: 'Club Aurora',
      endereco: 'Rua das Palmeiras, 123 - Centro',
      cidade: 'São Paulo',
      preco: 50.0,
      organizador: 'Events SP',
      categoria: 'Música',
      capacidadeMaxima: 500,
      imagemUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      latitude: -23.5505,
      longitude: -46.6333
    },
    {
      nome: 'Festa Junina da Comunidade',
      descricao: 'Tradicional festa junina com quadrilha, fogueira, comidas típicas e muito forró! Diversão garantida para toda a família.',
      dataHora: new Date('2024-06-24T19:00:00Z'),
      local: 'Praça Central',
      endereco: 'Praça da República, s/n',
      cidade: 'São Paulo',
      preco: 0.0,
      organizador: 'Prefeitura Municipal',
      categoria: 'Cultura',
      capacidadeMaxima: 1000,
      imagemUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      latitude: -23.5431,
      longitude: -46.6291
    },
    {
      nome: 'Show de Rock Nacional',
      descricao: 'Grandes bandas do rock nacional se apresentam em uma noite épica! Não perca esta oportunidade única.',
      dataHora: new Date('2024-03-20T21:30:00Z'),
      local: 'Arena Rock',
      endereco: 'Av. Paulista, 1578',
      cidade: 'São Paulo',
      preco: 80.0,
      organizador: 'Rock Productions',
      categoria: 'Música',
      capacidadeMaxima: 2000,
      imagemUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
      latitude: -23.5618,
      longitude: -46.6563
    },
    {
      nome: 'Carnaval de Rua 2024',
      descricao: 'Blocos de carnaval desfilam pelas ruas com muita alegria, fantasias coloridas e música brasileira!',
      dataHora: new Date('2024-02-12T15:00:00Z'),
      local: 'Ruas do Centro Histórico',
      endereco: 'Largo do Arouche',
      cidade: 'São Paulo',
      preco: 0.0,
      organizador: 'Blocos Unidos SP',
      categoria: 'Carnaval',
      capacidadeMaxima: 5000,
      imagemUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      latitude: -23.5386,
      longitude: -46.6418
    },
    {
      nome: 'Festival de Gastronomia',
      descricao: 'Experimente pratos deliciosos dos melhores chefs da região! Food trucks, degustações e workshops culinários.',
      dataHora: new Date('2024-04-28T12:00:00Z'),
      local: 'Parque Gastrômico',
      endereco: 'Rua dos Sabores, 456',
      cidade: 'Rio de Janeiro',
      preco: 25.0,
      organizador: 'Chefs Unidos RJ',
      categoria: 'Gastronomia',
      capacidadeMaxima: 800,
      imagemUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      latitude: -22.9068,
      longitude: -43.1729
    },
    {
      nome: 'Rave Sunset',
      descricao: 'Uma experiência única ao pôr do sol com música eletrônica, visual mapping e drinks especiais na praia!',
      dataHora: new Date('2024-03-10T17:00:00Z'),
      local: 'Praia de Copacabana',
      endereco: 'Av. Atlântica, 1000',
      cidade: 'Rio de Janeiro',
      preco: 60.0,
      organizador: 'Sunset Events',
      categoria: 'Música',
      capacidadeMaxima: 300,
      imagemUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      latitude: -22.9711,
      longitude: -43.1822
    },
    {
      nome: 'Festival de Arte Urbana',
      descricao: 'Exposição de grafite, street art, performances ao vivo e workshops de arte urbana com artistas locais.',
      dataHora: new Date('2024-05-15T14:00:00Z'),
      local: 'Galeria Urbana',
      endereco: 'Rua Augusta, 789',
      cidade: 'São Paulo',
      preco: 15.0,
      organizador: 'Coletivo Arte Viva',
      categoria: 'Arte',
      capacidadeMaxima: 400,
      imagemUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
      latitude: -23.5489,
      longitude: -46.6388
    },
    {
      nome: 'Noite do Samba',
      descricao: 'Roda de samba autêntica com os melhores sambistas da cidade! Venha dançar e cantar conosco.',
      dataHora: new Date('2024-02-29T20:00:00Z'),
      local: 'Casa do Samba',
      endereco: 'Rua do Samba, 321',
      cidade: 'Rio de Janeiro',
      preco: 30.0,
      organizador: 'Escola de Samba Unidos',
      categoria: 'Música',
      capacidadeMaxima: 250,
      imagemUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      latitude: -22.9083,
      longitude: -43.1964
    }
  ];

  console.log('📅 Criando eventos...');
  
  for (const evento of eventos) {
    const eventoCreated = await prisma.evento.create({
      data: evento
    });
    console.log(`✅ Evento criado: ${eventoCreated.nome}`);
  }

  console.log('🎉 Seed concluído com sucesso!');
  console.log(`📊 Total de eventos criados: ${eventos.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
