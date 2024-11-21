import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;

//Used to check MongoDB Connectivity
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//This is for setting up user routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);


app.get('/', (req,res) => res.send('Server is ready'))

//This is for setting up error middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))