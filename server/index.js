const express = require('express');
const mysql   = require('mysql2/promise');
const cors    = require('cors');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
require('dotenv').config();

const app = express();

// ------------------------------------------------
// Middlewares
// ------------------------------------------------
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder automatically if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ------------------------------------------------
// Multer setup for image uploads
// ------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ------------------------------------------------
// MySQL Database Connection
// ------------------------------------------------
const db = mysql.createPool({
  host:               process.env.DB_HOST,
  user:               process.env.DB_USER,
  password:           process.env.DB_PASSWORD,
  database:           process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0
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

// ------------------------------------------------
// API ROUTES
// ------------------------------------------------

// 1. GET: Fetch all products (with optional search)
// Example: GET /api/products?search=chanel
app.get('/api/products', async (req, res) => {
  const search = req.query.search || '';
  try {
    let rows;
    if (search) {
      [rows] = await db.execute(
        `SELECT * FROM products
         WHERE name LIKE ?
         ORDER BY CASE WHEN name LIKE ? THEN 0 ELSE 1 END, name ASC`,
        [`%${search}%`, `${search}%`]
      );
    } else {
      [rows] = await db.execute(
        'SELECT * FROM products ORDER BY created_at DESC'
      );
    }
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. POST: Add a new perfume product with image
app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  // --- Back-End Validation ---
  if (!name || !description || !price) {
    return res.status(400).json({ error: 'All fields are required: name, description, price' });
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Product image is required' });
  }

  // --- Save to Database ---
  try {
    const query = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, description, parsedPrice, req.file.filename]);
    res.status(201).json({
      message:   'Product added successfully!',
      productId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// ------------------------------------------------
// Start the Server
// ------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});