// src/presentation/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// TODO: Define routes
// GET /api/books
router.get('/', bookController.getAllBooks);

// GET /api/books/:id
// POST /api/books
// PUT /api/books/:id
// PATCH /api/books/:id/borrow
// PATCH /api/books/:id/return
// DELETE /api/books/:id

// ให้นักศึกษาเขียนเองต่อที่นี่

router.get('/', bookController.getAllBooks.bind(bookController));

// GET /api/books/:id
router.get('/:id', bookController.getBookById.bind(bookController));

// POST /api/books
router.post('/', bookController.createBook.bind(bookController));

// PUT /api/books/:id
router.put('/:id', bookController.updateBook.bind(bookController));

// PATCH /api/books/:id/borrow
router.patch('/:id/borrow', bookController.borrowBook.bind(bookController));

// PATCH /api/books/:id/return
router.patch('/:id/return', bookController.returnBook.bind(bookController));

// DELETE /api/books/:id
router.delete('/:id', bookController.deleteBook.bind(bookController));

module.exports = router;