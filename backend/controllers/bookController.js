import asyncHandler from '../middleware/asyncHandler.js';
import Book from '../models/bookModel.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    return res.json(book);
  }
  res.status(404);
  throw new Error('Resource not found');
});

export { getBooks, getBookById };
