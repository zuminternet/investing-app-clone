import * as mongoose from 'mongoose';
import 'reflect-metadata';
import { appContainer } from './AppContainer';

const DBConnect = function() {
  mongoose
    .connect('mongodb://localhost/investing-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('mongodb connected');
      appContainer.listen();
    })
    .catch((error) => {
      console.log(error);
    });
};

DBConnect();
mongoose.connection.on('disconnected', DBConnect);
