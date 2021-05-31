import 'reflect-metadata';
import { appContainer } from 'common/backend/AppContainer';
import mongoose from 'common/backend/mongoose';
import { mongoConfig } from './config';

mongoose.set('debug', true);

mongoose
  .connect(mongoConfig.uri, mongoConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
    appContainer.listen();
  })
  .catch((e) => console.log(e));
