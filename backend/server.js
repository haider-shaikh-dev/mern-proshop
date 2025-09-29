import express from 'express'; //package.json type:module
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

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

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=> console.log(`server is running on port ${port}`))