const express    = require('express');
const mysql      = require('mysql2');
const cors       = require('cors');
const dotenv     = require('dotenv');
const multer     = require('multer');
const path       = require('path');
const fs         = require('fs');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


app.use('/uploads', express.static(uploadsDir));


const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
    
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});


const fileFilter = (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const isValid  = allowed.test(file.mimetype) &&
                     allowed.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }   // 5 MB max
});


const db = mysql.createConnection({
    host     : process.env.DB_HOST     || 'localhost',
    user     : process.env.DB_USER     || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME     || 'perfume_catalog'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL: perfume_catalog');
});



app.post('/api/products', upload.single('image'), (req, res) => {

    const { name, description, price } = req.body;

   
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Product name is required' });
    }
    if (!description || !description.trim()) {
        return res.status(400).json({ error: 'Description is required' });
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
        return res.status(400).json({ error: 'Enter a valid price' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'Please upload an image' });
    }

    
    const imageUrl = `/uploads/${req.file.filename}`;

    
    const exactPrice = parseFloat(price);

    const sql = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [name.trim(), description.trim(), exactPrice, imageUrl], (err, result) => {
        if (err) {
            console.error('Insertion error:', err);
            return res.status(500).json({ error: 'Database error while adding product' });
        }
        res.status(201).json({
            message  : 'Perfume added successfully!',
            productId: result.insertId,
            image    : imageUrl
        });
    });
});


app.get('/api/products', (_req, res) => {
    const sql = 'SELECT * FROM products ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fetch error:', err);
            return res.status(500).json({ error: 'Database error while fetching products' });
        }
        res.json(results);
    });
});


app.get('/api/products/search', (req, res) => {
    const q = (req.query.q || '').trim();

    if (q === '') {
        
        return db.query(
            'SELECT * FROM products ORDER BY created_at DESC',
            (err, results) => {
                if (err) return res.status(500).json({ error: 'Database error' });
                res.json(results);
            }
        );
    }

    
    const sql = `
        SELECT *,
            CASE
                WHEN name LIKE ? THEN 0
                ELSE 1
            END AS sort_order
        FROM products
        WHERE name LIKE ?
        ORDER BY sort_order ASC, created_at DESC
    `;

    const startsWith = `${q}%`;   
    const contains   = `%${q}%`;  

    db.query(sql, [startsWith, contains], (err, results) => {
        if (err) {
            console.error('Search error:', err);
            return res.status(500).json({ error: 'Database error during search' });
        }
        res.json(results);
    });
});


app.use((err, _req, res, _next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'Image must be smaller than 5 MB' });
        }
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        return res.status(400).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
