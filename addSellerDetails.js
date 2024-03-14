const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = 3000;

// Database connection details 
const dbConfig = {
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'hdse264',
    waitForConnections : true , 
    connectionLimit : 10 ,
    queueLimit: 0 
}
// middleware to parse from data
app.use(bodyParser.urlencoded({extends:true}));
// Serve static file (HTML AND CSS)
app.use(express.static(path.join(__dirname, 'project_2024')));


//serve html form 
app.get('/' , (req , res) =>{
    res.sendFile(path.join(__dirname, 'project_2024', 'seller_reg.html'));
});

//handle Register form submisstion 
app.post('/register', async(req , res)=>{
    const {name , email , b_name , b_type , password} = req.body ;
    try{
        const connection = await mysql.createConnection(dbConfig);

        // insert data into database
        await connection.execute(
            'INSERT INTO seller_details (seller_name , email , bussiness_name , bussiness_type , password) values ( ?, ?, ?, ?, ?)',
            [name , email , b_name , b_type , password]
        );
            console.log("data insert successfully");

            // close the connection 
            await connection.end();

            res.send('registration successful');
    } catch(err){
        console.error('Error inserting data into database ' , err);
        res.status(500).send('internal server error');

    }
});
//handle Loginform submission
app.post('/login', async (req, res) => {
    const { login_email, login_password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Query the database to check if the email and password match
        const [rows] = await connection.execute(
            'SELECT * FROM seller_details WHERE email = ? AND password = ?',
            [login_email, login_password]
        );

        // Check if a user with the provided email and password exists
        if (rows.length > 0) {
            res.send('Login successful');
        } else {
            res.send('Invalid email or password');
        }

       
    } catch (err) {
        console.error('Error querying database for login ', err);
        res.status(500).send('Internal server error');
    }
});   

// start the server 
app.listen(port, () =>{
    console.log('server is running on http:/localhost:${port}');
})