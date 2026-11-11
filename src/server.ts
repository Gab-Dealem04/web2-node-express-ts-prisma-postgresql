import { app } from "./app";
import { prisma } from "./lib/prisma";

const port = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => console.log(`API em http://localhost:${port}`));

// encerramento limpo (o Cloud Run envia SIGTERM ao desligar a instância)
process.on("SIGTERM", async () => {
  server.close();
  await prisma.$disconnect();
});