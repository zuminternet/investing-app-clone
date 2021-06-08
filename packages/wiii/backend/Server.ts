import 'reflect-metadata';
import { appContainer } from './AppContainer';
import { getMongoConnection, getRedisConnection } from './db/';

(async () => {
  try {
    const mongoConn = await getMongoConnection();
    if (!mongoConn) throw new Error(`[DB] MongoDB Connection Failed`);
    console.info(`[DB] MongoDB Connected; '${mongoConn.name}'`);
    getRedisConnection();

    appContainer.listen();

    process.on('SIGINT', async () => {
      console.log(`Server Closing..`);
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
