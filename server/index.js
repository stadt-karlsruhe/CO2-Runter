const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Add mysql database connection
const db = mysql.createPool({
  host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
  user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
  password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'db_co2runter' // database name MYSQL_HOST_IP: mysql_db
})

// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => {
  res.send('Hi There')
});

// get all of the books in the database
app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM  Users";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

// add a book to the database
app.post("/insert", (req, res) => {
  const username = req.body.setusername; 
  const email = req.body. setemail;
  const password = req.body. setpassword;
  const InsertQuery = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
  db.query(InsertQuery, [username, email,password], (err, result) => {
    console.log(result)
  })
})

// delete a book from the database
app.delete("/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  const DeleteQuery = "DELETE FROM Users WHERE user_ID = ?";
  db.query(DeleteQuery, userId, (err, result) => {
    if (err) console.log(err);
  })
})

// update a book review
app.put("/update/:userId", (req, res) => {
  const email = req.body.emailUpdate;
  const userId = req.params.userId;
  const UpdateQuery = "UPDATE Users SET email = ? WHERE user_ID = ?";
  db.query(UpdateQuery, [email, userId], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen('3001', () => { })