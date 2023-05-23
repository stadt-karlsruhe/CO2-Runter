const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");
const groups_routes = require("./routes/groups_routes");
const user_routes = require("./routes/user_routes");
const {db} = require('./services/db');
const dashboard_routes = require("./routes/dashboard_routes");


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
    const { email, password, username } =  req.body;

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
  const { email, password } =  req.body;

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

// route get list of all disticts 
app.get('/districts', (req, res) => {
  const SelectQuery = " SELECT * FROM  Districts";
  db.query(SelectQuery, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    } else {
      res.status(200).send(result)
    }
  })
})

// route save footprint to db 
app.post('/footprint', (req, res) => {
  let sucsses = true;
  // Get user input
  const { groups, district, data } = req.body;
  // Validate user input 
  if (!(groups && district && data )) {
      sucsses = false;
      res.status(400).send("All input is required");
      console.log("field missing")
  }else if(!(((groups.length > 0 )|| (district > 0) && data.length == 4))){ 
    sucsses = false;
    res.status(400).send("All input is required");
    console.log("data in field missing")
    console.log(groups.length)
    console.log(district)
    console.log(data.length)
  }


  else {
    console.log("data is ok")
    console.log(groups)
    console.log(district)
    console.log(data)
    const InsertQuery = "INSERT INTO CO2Prints (mobility, housing, consume, nutrition, date) VALUES (?, ?, ?, ?, ?)";
    db.query(InsertQuery, [data[0], data[1], data[2], data[3], new Date()], (err, result) => {
      if(err) {
        console.log(err)
        sucsses = false;
        res.status(500).send('Something went wrong')
      } else {
        // get the id of the footprint
        const footprint_id = result.insertId;
        // if a district is selected add the footprint to the table Prints_In_Districts with this columns: district_ID	and print_ID
        if(district > 0) {
          console.log("Addedto :"+ district)
          const InsertQuery = "INSERT INTO Prints_In_Districts (district_ID, print_ID) VALUES (?, ?)";
          db.query(InsertQuery, [district, footprint_id], (err, result) => {
            if(err) {
              console.log(err)
              sucsses = false;
              res.status(500).send('Something went wrong')
            } 
          })
        }
        // if there are groups selected add the footprint to all groups in the table Prints_In_Carbon_Footprint_Groups with this columns: group_ID and print_ID
        if(groups.length > 0) {
          groups.forEach(group => {
            const InsertQuery = "INSERT INTO Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) VALUES (?, ?)";
            db.query(InsertQuery, [group, footprint_id], (err, result) => {
              if(err) {
                console.log(err)
                sucsses = false;
                res.status(500).send('Something went wrong')
              } 
            })
          });
        }
      }
    })
    if (sucsses) {
      res.status(200).send('Footprint saved')
    }
  }
})

// route get total number of foodprints	
app.get('/foodprint/total', (req, res) => {
  const SelectQuery = " SELECT COUNT(*) AS total FROM  CO2Prints";
  db.query(SelectQuery, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    } else {
      res.status(200).send(result)
    }
  })
})

// route get total number of foodprints in a district for all districts
app.get('/foodprint/districts', (req, res) => {
  const SelectQuery = " SELECT Districts.name, COUNT(Prints_In_Districts.print_ID) AS total FROM Districts LEFT JOIN Prints_In_Districts ON Districts.district_ID = Prints_In_Districts.district_ID GROUP BY Districts.district_ID";
  db.query(SelectQuery, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    } else {
      res.status(200).send(result)
    }
  })
})

app.use('/groups', groups_routes);
app.use('/user', user_routes);
app.use('/dashboard', dashboard_routes);


app.get('/user', auth, (req, res) => {
  res.send(req.user)
})

app.listen('3001', () => { })