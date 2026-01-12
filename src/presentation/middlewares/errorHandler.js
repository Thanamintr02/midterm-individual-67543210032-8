function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // TODO: Handle different error types
    let statusCode = 500;

    if (err.name === 'ValidationError' || err.message.includes('required') || err.message.includes('format')) {
        statusCode = 400; // ValidationError
    } else if (err.name === 'NotFoundError' || err.message.includes('not found')) {
        statusCode = 404; // NotFoundError
    } else if (err.name === 'ConflictError' || err.message.includes('UNIQUE')) {
        statusCode = 409; // ConflictError (เช่น ISBN ซ้ำ)
    }
    
    res.status(statusCode).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;