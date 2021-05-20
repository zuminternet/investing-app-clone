import 'reflect-metadata';
import { appContainer } from 'common/backend/AppContainer';
import * as mongoose from 'mongoose';

mongoose
  .connect('mongodb://127.0.0.1:27017/investing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'zum',
    pass: 'zumdev',
    authSource: 'admin',
  })
  .then(() => {
    console.log('Connected to MongoDB');
    appContainer.listen();
  })
  .catch((e) => console.log(e));
