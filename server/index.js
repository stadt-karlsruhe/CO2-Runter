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
            result[index] = { ...result2[0], ownername: result4[0].username , ...result3[0]};
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

app.post('/groups/add_user', (req, res) => {
  console.log(req.query)
  const SelectQuery = " SELECT group_ID FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
  db.query(SelectQuery, [req.query.groupcode], (err, result) => {
    if (result.length === 0) {
      res.status(404).send('Group not found');
    } else {
      const InsertQuery = " INSERT INTO Groupmemberships (group_ID, user_ID) VALUES (?, ?)";
      console.log(result[0].group_ID)
      console.log(req.query.user_ID)
      db.query(InsertQuery, [result[0].group_ID, req.query.user_ID], (err, result) => {
        if(err) {
          if(err.code === 'ER_DUP_ENTRY') {
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

app.get('/groups/:groupcode', (req, res) => {
  const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
  db.query(SelectQuery, [req.params.groupcode], (err, result) => {
    if (result.length === 0) {
      res.status(404).send('Group not found');

    } 
    else {
      const SelectQuery = " SELECT COUNT(*) AS memberCount FROM  Groupmemberships WHERE group_ID = ?";
      db.query(SelectQuery, [result[0].group_ID], (err, result2) => {
        db.query("SELECT username FROM Users WHERE user_ID = ?", [result[0].owner_ID], (err, result3) => {
          result[0] = { ...result[0], ownername: result3[0].username , ...result2[0]};
          delete result[0].user_ID;
          delete result[0].owner_ID;
          delete result[0].groupcode;
          delete result[0].group_ID;
          if (err){
            res.status(500).send('Something went wrong')
          } else {
          res.send(result[0])
          }
        })
      })
    }
  })
})

app.post('/groups/create', async (req, res) => {
    let groupcode = '';
    let isUnique = false;
    while (!isUnique) {
      groupcode = generateCode(6);
      console.log(groupcode)
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
        res.status(200).json({ groupcode });
      }
      )
    }
    })
  })
  

app.listen('3001', () => { })