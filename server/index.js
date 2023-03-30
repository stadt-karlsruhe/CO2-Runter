const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");
const groups_routes = require("./routes/groups_routes");
const {db} = require('./services/db');


// read json file 
const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));


// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', auth, (req, res) => {
  res.send('Hi There')
});

app.get('/questions', (req, res) => {
  res.send(questions)
})

app.post('/register', async (req, res) => {
    // Get user input
    const { email, password, username } =  req.query;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    const email_low = email.toLowerCase();
    // check if user already exists
    const SelectQuery = " SELECT * FROM  Users WHERE email = ?";
    db.query(SelectQuery, [email_low], async (err, result) => {
      if (result.length > 0) {
        res.status(409).send("User Already Exist. Please Login");
      } else {
        // encrypt password
        encryptedpassword = await bcrypt.hash(password, 10);
        // create new user
        const InsertQuery = " INSERT INTO Users (username, email, password) VALUES (?, ?, ?)";
        db.query(InsertQuery, [username, email_low, encryptedpassword], (err, result) => {
          if(err) {
            console.log(err)
            res.status(500).send('Something went wrong')
          } else {
            user = result;
            // create token
            const token = jwt.sign(
              { user_id: result.insertId, email_low },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;
            res.status(201).send({token})
          }
        })
      }
    })
})


app.post('/login', async (req, res) => {
  // Get user input
  const { email, password } =  req.query;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  const email_low = email.toLowerCase();
  // check if user exists
  const SelectQuery = " SELECT * FROM  Users WHERE email = ?";
  db.query(SelectQuery, [email_low], async (err, result) => {
    if (result.length === 0) {
      res.status(400).send("Invalid Credentials");
    } else {
      user = result;
      // compare password
      const validPassword = await bcrypt.compare(password, await result[0].password);
      if (validPassword) {
        // create token
        const token = jwt.sign(
          { user_id: result[0].user_ID, email_low },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
        res.status(200).send({token})
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  })
})

app.use('/groups', groups_routes);

 //get user ID from token
 app.get('/user', auth, (req, res) => {
  res.send(req.user)
})

app.listen('3001', () => { })