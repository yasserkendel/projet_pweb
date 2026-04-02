const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for reading data sent as JSON

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'perfume_catalog' // Database name from your screenshot
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL: perfume_catalog');
});

// --- API to add a new perfume using an image URL ---
app.post('/api/products', (req, res) => {
    // Receiving data from the request body (Front-End)
    const { name, description, price, image } = req.body;

    // Validation: Check if required fields are present
    if (!name || !description || !price) {
        return res.status(400).json({ error: "Please fill in all required fields" });
    }

    // SQL query matching your table structure
    const sql = "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [name, description, price, image], (err, result) => {
        if (err) {
            console.error("Insertion Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ 
            message: "Perfume added successfully!", 
            productId: result.insertId 
        });
    });
});

// API to fetch all products (to display them on the website)
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});