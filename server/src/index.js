import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Optional MongoDB connection
async function connectMongoIfConfigured() {
  if (!mongoUri) {
    console.log('MONGODB_URI not set. Skipping MongoDB connection.');
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello Cursor World from the MERN backend!' });
});

app.get('/', (req, res) => {
  res.send('Server is running. Try GET /api/hello');
});

app.listen(port, async () => {
  await connectMongoIfConfigured();
  console.log(`Server listening on http://localhost:${port}`);
});

