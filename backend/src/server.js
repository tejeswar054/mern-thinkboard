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
const __dirname = path.resolve();

// CORS for development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
}

app.use(express.json());
app.use(rateLimiter);

// Log incoming requests
app.use((req, res, next) => {
  console.log(`request method: ${req.method}, request url: ${req.url}`);
  next();
});

// Routes
app.use('/api/notes', notesRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// ✅ Connect to DB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
