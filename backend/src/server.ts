import { CreateApp } from './app';
import { env } from './config/env';

export async function start() {
  try {
    const server = await CreateApp();

    process.on('unhandledRejection', (err) => {
      console.error(err);
      process.exit(1);
    });

    const port = env.PORT;
    const host = env.HOST;

    await server.listen({ host, port });
    console.log(`🚀Server listening on http://${host}:${port}`);

    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, async () => {
        server.close().then(() => {
          console.log('Server closed');
          process.exit(0);
        });
      });
    }
    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
