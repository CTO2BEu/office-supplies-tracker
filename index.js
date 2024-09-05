const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Set up Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        // You can also add a file transport or other transports here
        // new winston.transports.File({ filename: 'combined.log' })
    ],
});

// Middleware
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.url}`);
    next();
});

// Routes
const suppliesRoutes = require('./routes/supplies');
app.use('/api/supplies', suppliesRoutes);

// Serve static HTML file and JavaScript
app.use(express.static('public'));

// Start the server and listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    logger.info(`Office Supplies Tracker app listening at http://0.0.0.0:${port}`);
});