const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3001;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hdse264'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // specify the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Route for handling form submission
app.post('/post-product', upload.single('p_photo'), (req, res) => {
  const { p_name, p_desc, p_price, p_quantity } = req.body;
  const p_photo = req.file.filename; // Get the filename of the uploaded file

  const query = `INSERT INTO products (p_name, p_desc, p_price, p_quantity, p_photo) VALUES (?, ?, ?, ?, ?)`;
  const values = [p_name, p_desc, p_price, p_quantity, p_photo];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL database: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Product inserted successfully');
    res.status(200).send('Product posted successfully');
  });
});
// Serve static file (HTML AND CSS)
app.use(express.static(path.join(__dirname, 'project_2024')));


//serve html form 
app.get('/' , (req , res) =>{
    res.sendFile(path.join(__dirname, 'project_2024', 'prodect_reg.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
