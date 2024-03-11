const express = require('express');
const bodyParser = require(body-parser);
const mysql = require('mysql2/promise');

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

//serve html form 
app.get('/' , (req , res) =>{
    res.sendFile(__dirname+'/seller_reg.html');
});
//handle form submisstion 
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

// start the server 
app.listen(port, () =>{
    console.log('server is running on http:/localhost${port}');
})