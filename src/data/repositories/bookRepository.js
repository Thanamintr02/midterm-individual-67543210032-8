const db = require('../database/connection');

const bookRepository = {
    findAll: (status) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            let params = [];
            if (status) {
                sql += ' WHERE status = ?';
                params.push(status);
            }
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    create: (bookData) => {
        const { title, author, isbn } = bookData;
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)';
            db.run(sql, [title, author, isbn], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },
    update: (id, bookData) => {
        const { title, author, isbn } = bookData;
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?';
            db.run(sql, [title, author, isbn, id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    updateStatus: (id, status) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE books SET status = ? WHERE id = ?', [status, id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = bookRepository;