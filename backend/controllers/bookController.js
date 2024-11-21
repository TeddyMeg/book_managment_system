import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).populate('author', 'name');
  res.json(books);
});

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author', 'name');
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, publishedYear, description, imageUrl } = req.body;

  const book = new Book({
    title,
    author,
    isbn,
    publishedYear,
    description,
    imageUrl,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const { title, author, isbn, publishedYear, description, imageUrl } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.publishedYear = publishedYear;
    book.description = description;
    book.imageUrl = imageUrl;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Get random book recommendations
// @route   GET /api/books/recommendations
// @access  Public
const getBookRecommendations = asyncHandler(async (req, res) => {
  const books = await Book.aggregate([{ $sample: { size: 3 } }]);
  res.json(books);
});

// @desc    Toggle favorite book
// @route   POST /api/books/:id/favorite
// @access  Private
const toggleFavorite = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  const userId = req.user._id;

  if (book) {
    const isFavorited = book.favorites.includes(userId);
    
    if (isFavorited) {
      book.favorites = book.favorites.filter(id => !id.equals(userId));
    } else {
      book.favorites.push(userId);
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

export {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookRecommendations,
  toggleFavorite,
};