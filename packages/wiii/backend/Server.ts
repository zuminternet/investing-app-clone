import 'reflect-metadata';
import { appContainer } from './AppContainer';
import { getMongoConnection, getRedisConnection } from './db/';

(async () => {
  try {
    const mongoConn = await getMongoConnection();
    getRedisConnection();
    appContainer.listen();

    process.on('SIGINT', async () => {
      try {
        if (mongoConn) await mongoConn.close();
      } catch (e) {
        console.error(e);
      }
      process.exit(0);
    });
  } catch (e) {
    console.error();
  }
})();
