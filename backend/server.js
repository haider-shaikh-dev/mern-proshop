import express from 'express'; //package.json type:module
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import { PAYPAL_URL } from '../frontend/src/constants.js';

const port= process.env.PORT || 8000;

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
app.use('/api/upload', uploadRoutes);

app.get(PAYPAL_URL, (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));  
//Make the uploads folder static so that we can access the images

//Error Handling middlewares
  

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=> console.log(`server is running on port ${port}`))