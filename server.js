const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');
const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes); // ทุก path จะขึ้นต้นด้วย /api/books
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));