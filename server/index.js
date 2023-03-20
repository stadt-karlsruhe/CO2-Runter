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
  db.query(SelectQuery, [req.query.user_ID], (err, result) => {
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

app.get('/groups/member', (req, res) => {
  const SelectQuery = " SELECT * FROM  Groupmemberships WHERE user_ID = ?";
  db.query(SelectQuery, [req.query.user_ID], (err, result) => {
    // if result is empty, send empty array
    if (result.length === 0) {
      res.send([])
    }
    // for each group, get the group data and add it to the result
    result.forEach((group, index) => {
      const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE group_ID = ?";
      db.query(SelectQuery, [group.group_ID], (err, result2) => {
        //count the members of each group and add it to the result
        const SelectQuery = " SELECT COUNT(*) AS memberCount FROM  Groupmemberships WHERE group_ID = ?";
        db.query(SelectQuery, [group.group_ID], (err, result3) => {

          db.query("SELECT username FROM Users WHERE user_ID = ?", [result2[0].owner_ID], (err, result4) => {
            result[index] = { ...result2[0], owner_name: result4[0].username , ...result3[0]};
            delete result[index].user_ID;
            delete result[index].owner_ID;
          })
        })
      })
    })
    setTimeout(() => {
      res.send(result)
    }, 100)
  })
})

app.listen('3001', () => { })