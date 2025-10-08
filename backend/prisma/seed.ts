import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Inserir alguns eventos de exemplo (opcional)
  const eventosExemplo = [
    {
      nome: "Festa de Ano Novo 2025",
      dataHora: new Date("2024-12-31T22:00:00"),
      cidade: "São Paulo, SP",
      local: "Centro de Convenções",
      destaque: true,
      descricaoCurta: "Celebrate o ano novo com estilo!"
    },
  ];

  for (const evento of eventosExemplo) {
    await prisma.festa.create({ data: evento });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });