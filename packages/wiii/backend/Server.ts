import 'reflect-metadata';
import { appContainer } from './AppContainer';
import { getMongoConnection } from './db/';

getMongoConnection()
  .then((conn) => {
    appContainer.listen();

    process.on('SIGINT', async () => {
      try {
        if (conn) await conn.close();
      } catch (e) {
        console.error(e);
      }
      process.exit(0);
    });
  })
  .catch((e) => console.error(e));
