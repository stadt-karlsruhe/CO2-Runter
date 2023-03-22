const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");

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


// Helper function to generate random alphanumeric code
function generateCode(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Helperfunction to get the number of members in a group
async function getMemberCount(group_ID) {
    const [rows, fields] = await db.promise().query(
        'SELECT COUNT(*) AS memberCount FROM Groupmemberships WHERE group_ID = ?', [group_ID]
      );
      return rows[0].memberCount;
}
// Helper function to get username from user_ID
async function getUsername(user_ID) {
  const [rows, fields] = await db.promise().query(
      'SELECT username FROM Users WHERE user_ID = ?', [user_ID]
    );
    return rows[0].username;
}

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


app.get('/groups/admin', (req, res) => {
  const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE owner_ID = ?";
  db.query(SelectQuery, [req.query.user_ID], (err, result) => {
    //count the members of each group and add it to the result
    result.forEach(async (group, index) => {
        result[index].memberCount = await getMemberCount(group.group_ID);
        delete result[index].owner_ID;
        delete result[index].group_ID;
    })
    setTimeout(() => {
      res.send(result)
    }, 100)
  })
})

app.get('/groups/member', async(req, res) => {
  const SelectQuery = " SELECT * FROM  Groupmemberships WHERE user_ID = ?";
  db.query(SelectQuery, [req.query.user_ID], (err, result) => {
    // if result is empty, send empty array
    if (result.length === 0) {
      res.send([])
    }
    // for each group, get the group data and add it to the result
    result.forEach(async (group, index) => {
      const [rows, fields] = await db.promise().query(
        " SELECT * FROM  Carbon_Footprint_Groups WHERE group_ID = ?", [group.group_ID]
      );
      result[index] = { ...rows[0]};
      result[index].ownername = await getUsername(result[index].owner_ID);
      result[index].memberCount = await getMemberCount(group.group_ID);
      delete result[index].owner_ID;
      delete result[index].group_ID;
    })
    setTimeout(() => {
      res.send(result)
    }, 100)
  })
})

app.post('/groups/add_user', (req, res) => {
  const SelectQuery = " SELECT group_ID FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
  db.query(SelectQuery, [req.query.groupcode], (err, result) => {
    if (result.length === 0) {
      res.status(404).send('Group not found');
    } else {
      const InsertQuery = " INSERT INTO Groupmemberships (group_ID, user_ID) VALUES (?, ?)";
      db.query(InsertQuery, [result[0].group_ID, req.query.user_ID], (err, result) => {
        if(err) {
          if(err.code === 'ER_DUP_ENTRY') {
            console.log(err)
            res.status(409).send('User already in group')
          } else {
          console.log(err)
          res.status(500).send('Something went wrong')
          }
        } else {
          res.status(200).send('User added to group')
        }
        
      })
    }
  })
})

app.get('/groups/get/:groupcode',async  (req, res) => {
  const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
  db.query(SelectQuery, [req.params.groupcode], async (err, result) => {
    if (result.length === 0) {
      res.status(404).send('Group not found');

    } 
    else {
      result[0].ownername = await getUsername(result[0].owner_ID);
      result[0].memberCount = await getMemberCount(result[0].group_ID);
      delete result[0].user_ID;
      delete result[0].owner_ID;
      delete result[0].groupcode;
      delete result[0].group_ID;
      res.send(result[0])
          
    }
  })
})

app.post('/groups/create', async (req, res) => {
    let groupcode = '';
    let isUnique = false;
    while (!isUnique) {
      groupcode = generateCode(6);
      const [rows, fields] = await db.promise().query(
        'SELECT COUNT(*) as count FROM Carbon_Footprint_Groups WHERE groupcode = ?',
        [groupcode]
      );
      if (rows[0].count === 0) {
        isUnique = true;
      }
    }
    const InsertQuery = " INSERT INTO Carbon_Footprint_Groups (groupname, groupcode, owner_ID) VALUES (?, ?, ?)";
    db.query(InsertQuery, [req.query.groupname, groupcode, req.query.user_ID], (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      } else {
        const InsertQuery = " INSERT INTO Groupmemberships (group_ID, user_ID) VALUES (?, ?)";
        db.query(InsertQuery, [result.insertId, req.query.user_ID], (err, result2) => {
        res.status(201).json({ groupcode });
      }
      )
    }
    })
  })

app.delete('/groups/delete/:groupcode', (req, res) => {
  const SelectQuery = " SELECT group_ID FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
  db.query(SelectQuery, [req.params.groupcode], (err, result) => {
    if (result.length === 0) {
      res.status(404).send({ error : 'Group not found'});
    } else {
      const DeleteQuery = " DELETE FROM Carbon_Footprint_Groups WHERE group_ID = ?";
      db.query(DeleteQuery, [result[0].group_ID], (err, result) => {
        if(err) {
          console.log(err)
          res.status(500).send({ error : 'Something went wrong'})
        } else {
          res.status(200).send('Group deleted')
        }
      })
    }
  })
})

//get user ID from token
app.get('/user', auth, (req, res) => {
  res.send(req.user)
})

app.listen('3001', () => { })