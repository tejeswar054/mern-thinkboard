


import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
))

app.use(express.json())
app.use(rateLimiter);

app.use((req,res,next) => {
    console.log(`request method: ${req.method}, request url: ${req.url}`);
    next();
});


app.use('/api/notes', notesRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});





