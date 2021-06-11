import 'reflect-metadata';
import { appContainer } from './AppContainer';
import { getMongoConnection, getRedisConnection, ReplyRepository, UserRepository } from './db/';
import { Reply } from './db/entity/Reply.entity';

(async () => {
  try {
    const mongoConn = await getMongoConnection();
    if (!mongoConn) throw new Error(`[DB] MongoDB Connection Failed`);
    console.info(`[DB] MongoDB Connected; '${mongoConn.name}'`);
    /** MongoDB 초기화 */
    // mongoConn.getMongoRepository(Reply).deleteMany({});

    // import('./db/dummy.js').then(async ({ default: data }) => {
    //   const result = await mongoConn.getCustomRepository(ReplyRepository).insertMany(data);
    //   console.table({ dummies: result.result.n });
    // });

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
