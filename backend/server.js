import express from 'express'
import books from './data/books.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
dotenv.config()
connectDB();
const port = process.env.PORT || 8000;

const app = express();

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find((p) => p._id === req.params.id);
  res.json(book);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
