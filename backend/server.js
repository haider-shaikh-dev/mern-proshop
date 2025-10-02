import express from 'express'; //package.json type:module
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import { PAYPAL_URL } from '../frontend/src/constants.js';

const port= process.env.PORT || 5000;

connectDB(); //connection to the database
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Cookie parser middleware

app.get("/", (req, res) => {
  res.send("NodeJS API is running!!!");
});

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.get(PAYPAL_URL, (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=> console.log(`server is running on port ${port}`))