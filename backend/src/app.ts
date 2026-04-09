import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';

import { PORT, MONGO_URI } from './config';
import { requestLogger, errorLogger } from './middlewares/logger';
import Product from './models/product';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.delete('/reset', async (_req, res) => { try { await Product.deleteMany({}); res.status(200).send({ message: 'All products deleted' }); } catch (err) { res.status(500).send({ message: 'Failed to reset products', error: err }); } });
app.use(errorLogger);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
    console.log('MONGO_URI:', process.env.MONGO_URI);
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
