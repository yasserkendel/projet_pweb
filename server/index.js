const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // To allow the React frontend to communicate with this server
app.use(express.json()); // To parse JSON data sent from the frontend

// Create a MySQL Connection Pool using variables from your .env file
const db = mysql.createPool({
    host: process.env.DB_HOST,         // Reads 'localhost' from .env
    user: process.env.DB_USER,         // Reads 'root' from .env
    password: process.env.DB_PASSWORD, // Reads the empty password from .env
    database: process.env.DB_NAME,     // Reads 'perfume_catalog' from .env
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection on startup
db.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL database successfully.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection error:', err.message);
    });

// --- API ROUTES ---

// 1. GET: Fetch all products from the database
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// 2. POST: Add a new perfume product
app.post('/api/products', async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const query = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, description, price, image]);
        res.status(201).json({ 
            message: 'Product added successfully!', 
            productId: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Start the server on the port defined in .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});