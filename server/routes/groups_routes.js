const express = require('express');
const router = express.Router();
const {db} = require('../services/db');
const auth = require("../middleware/auth");

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
  

router.get('/admin', auth, async (req, res) => {
  const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE owner_ID = ?";
  db.query(SelectQuery, [req.user.user_id], (err, result) => {
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

  
router.get('/member', auth, async(req, res) => {
    const SelectQuery = " SELECT * FROM  Groupmemberships WHERE user_ID = ?";
    db.query(SelectQuery, [req.user.user_id], (err, result) => {
      // if result is empty, send empty array
      if (result.length === 0) {
        res.send([])
      }
      else { result.forEach(async (group, index) => {
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
      }, 100)}
    })
  })
  
router.post('/add_user', auth,(req, res) => {
    const SelectQuery = " SELECT group_ID FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
    db.query(SelectQuery, [req.body.groupcode], (err, result) => {
      if (result.length === 0) {
        res.status(404).send('Group not found');
      } else {
        const InsertQuery = " INSERT INTO Groupmemberships (group_ID, user_ID) VALUES (?, ?)";
        db.query(InsertQuery, [result[0].group_ID, req.user.user_id], (err, result) => {
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
  
router.get('/get',async  (req, res) => {
    const SelectQuery = " SELECT * FROM  Carbon_Footprint_Groups WHERE groupcode = ?";
    db.query(SelectQuery, [req.body.groupcode], async (err, result) => {
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
  
router.post('/create', auth, async (req, res) => {
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
      console.log(req.user.user_id)
      const InsertQuery = " INSERT INTO Carbon_Footprint_Groups (groupname, groupcode, owner_ID) VALUES (?, ?, ?)";
      db.query(InsertQuery, [req.body.groupname, groupcode, req.user.user_id], (err, result) => {
        if(err) {
          console.log(err)
          res.status(500).send('Something went wrong')
        } else {
          const InsertQuery = " INSERT INTO Groupmemberships (group_ID, user_ID) VALUES (?, ?)";
          db.query(InsertQuery, [result.insertId, req.user.user_id], (err, result2) => {
          res.status(201).json({ groupcode });
        }
        )
      }
      })
    })
  
router.delete('/delete/:groupcode', (req, res) => {
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
  
module.exports = router;