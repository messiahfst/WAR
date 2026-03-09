import { createApp } from "./app.js";

const defaultPort = Number(process.env.PORT ?? 3000);
const app = createApp();

const maxPortRetries = 20;

const startServer = (port: number, retriesLeft = maxPortRetries): void => {
  const server = app.listen(port, () => {
    console.log(`WAR backend listening on http://localhost:${port}`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE" && retriesLeft > 0) {
      const fallbackPort = port + 1;
      console.warn(
        `Port ${port} already in use, retrying on http://localhost:${fallbackPort}`,
      );
      startServer(fallbackPort, retriesLeft - 1);
      return;
    }

    if (error.code === "EADDRINUSE") {
      throw new Error(
        `No free backend port found starting at ${defaultPort} after ${maxPortRetries} retries.`,
      );
    }

    throw error;
  });
};

startServer(defaultPort);
