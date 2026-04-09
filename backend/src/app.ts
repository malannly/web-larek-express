import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import { errors } from 'celebrate';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';

import { PORT, DB_ADDRESS } from './config';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use(errorLogger);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
