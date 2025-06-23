import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const tiposTreino = [
    { tipo: "Hipertrofia", descricao: "Treino para ganho de massa muscular" },
    { tipo: "Natação", descricao: "Treino de natação para resistência cardiovascular" },
    { tipo: "Muay Thai" },
    { tipo: "Funcional" },
    { tipo: "Pilates" },
    { tipo: "Crossfit" },
    { tipo: "Cardio" },
    { tipo: "Yoga" },
    { tipo: "Zumba" },
    { tipo: "Boxe" },
    { tipo: "Spinning" },
    { tipo: "Alongamento" },
    { tipo: "Treinamento Funcional" },
    { tipo: "Calistenia" },
  ];

  for (const treino of tiposTreino) {
    await prisma.tipodeTreino.upsert({
        where: { tipo: treino.tipo }, // funciona porque tipo agora é unique
        update: {},
        create: treino,
      });      
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
