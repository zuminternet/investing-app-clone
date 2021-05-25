import 'reflect-metadata';
import { appContainer } from 'common/backend/AppContainer';
import * as mongoose from 'mongoose';
import { mongoConfig } from './config';

mongoose
  .connect(mongoConfig.uri, mongoConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
    appContainer.listen();
  })
  .catch((e) => console.log(e));
