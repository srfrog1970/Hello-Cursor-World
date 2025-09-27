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

// In-memory counter (in a real app, you'd use a database)
let counter = 0;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello Cursor World from the MERN backend!' });
});

app.get('/api/time', (req, res) => {
  const now = new Date();
  res.json({ 
    time: now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
  });
});

app.post('/api/counter', (req, res) => {
  counter++;
  res.json({ count: counter });
});

app.get('/api/counter', (req, res) => {
  res.json({ count: counter });
});

app.get('/', (req, res) => {
  res.send('Server is running. Try GET /api/hello, /api/time, or POST /api/counter');
});

app.listen(port, async () => {
  await connectMongoIfConfigured();
  console.log(`Server listening on http://localhost:${port}`);
});

