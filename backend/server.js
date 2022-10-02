const express = require('express');

// Database
const database = require('./database/database');

// Middlewares
const logger = require('./middleware/logger');

// Routes
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(logger);

app.use(usersRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port \x1B[33m${PORT}\x1B[m `));
