const bookService = require('../../business/services/bookService');

class BookController {
    // TODO: Implement getAllBooks
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            // เรียก bookService.getAllBooks() และส่ง response
            const data = await bookService.getAllBooks(status);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement getBookById
    async getBookById(req, res, next) {
        try {
            const book = await bookService.getBookById(req.params.id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement createBook
    async createBook(req, res, next) {
        try {
            const newBook = await bookService.addBook(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement updateBook
    async updateBook(req, res, next) {
        try {
            const updatedBook = await bookService.updateBook(req.params.id, req.body);
            res.json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement borrowBook
    async borrowBook(req, res, next) {
        try {
            const book = await bookService.borrowBook(req.params.id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement returnBook
    async returnBook(req, res, next) {
        try {
            const book = await bookService.returnBook(req.params.id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement deleteBook
    async deleteBook(req, res, next) {
        try {
            await bookService.deleteBook(req.params.id);
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();