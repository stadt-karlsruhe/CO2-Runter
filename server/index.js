const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// read json file 
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));


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

app.get('/questions', (req, res) => {
  res.send(questions)
})

app.get('/groups/admin', (req, res) => {
  const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE owner_ID = ?";
  db.query(SelectQuery, [req.query.uid], (err, result) => {
    //count the members of each group and add it to the result
    result.forEach((group, index) => {
      const SelectQuery = " SELECT COUNT(*) AS memberCount FROM  Groupmemberships WHERE group_ID = ?";
      db.query(SelectQuery, [group.group_ID], (err, result2) => {
        result[index].memberCount = result2[0].memberCount;
        if (index === result.length - 1) {
          res.send(result)
        }
      })
  })
})
})

//todo delete
// get all of the books in the database
app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM  Users";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

app.get('/questions', (req, res) => {
  res.send(questions)
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