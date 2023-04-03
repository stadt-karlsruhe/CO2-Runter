const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {db} = require('../services/db');
const auth = require('../middleware/auth');

//reset password route 
router.put('/change_password',auth, async (req, res) => {
    const {old_password, new_password} =  req.query;
    if (!(old_password && new_password)) {
        res.status(400).send("All input is required");
      }
      const SelectQuery = " SELECT * FROM  Users WHERE user_ID = ?";
      user = await req.user;
      console.log(user)
    db.query(SelectQuery, [user.user_id], async (err, result) => {
      if(result.length == 0){
        res.status(404).send("The user with the specified ID was not found.");
      } else {
        // compare password
        const validPassword = await bcrypt.compare(old_password, await result[0].password);
        if (validPassword) {
          //reset password
          const encryptedPassword = await bcrypt.hash(new_password, 10);
          db.query( "UPDATE Users SET password = ? WHERE user_ID = ?", [encryptedPassword, user.user_id], async (err, result) => {
            if(err) {
              console.log(err)
              res.status(500).send('Something went wrong')
            } else {
              res.status(200).send("Password successfully changed")
            }
          })    
        } else {
          res.status(400).send("The request was invalid or incomplete.");
        }
      }
  })
})

router.put('/change_email',auth, async (req, res) => {
    const {new_email} =  req.query;
    if (!(new_email)) {
        res.status(400).send("All input is required");
        }
        else {
          const email_low = new_email.toLowerCase();
          const SelectQuery = " SELECT * FROM  Users WHERE user_ID = ?";
        user = await req.user;
        db.query(SelectQuery, [user.user_id], async (err, result) => {
          if(result.length == 0){
            res.status(404).send("The user with the specified ID was not found.");
          } else {
            // change email
            db.query( "UPDATE Users SET email = ? WHERE user_ID = ?", [email_low, user.user_id], async (err, result) => {
              if(err) {
                console.log(err)
                res.status(500).send('Something went wrong')
              } else {
                res.status(200).send("Email successfully changed")
              }
            })  
          }
      })
  }
})

router.put('/change_username',auth, async (req, res) => {
    const {new_username} =  req.query;
    if (!(new_username)) {
        res.status(400).send("All input is required");
        }
        else {
          const SelectQuery = " SELECT * FROM  Users WHERE user_ID = ?";
        user = await req.user;
        db.query(SelectQuery, [user.user_id], async (err, result) => {
          if(result.length == 0){
            res.status(404).send("The user with the specified ID was not found.");
          } else {
            // change username
            db.query( "UPDATE Users SET username = ? WHERE user_ID = ?", [new_username, user.user_id], async (err, result) => {
              if(err) {
                console.log(err)
                res.status(500).send('Something went wrong')
              } else {
                res.status(200).send("Username successfully changed")
              }
            })
          }
      })
  }
})


router.get('/test', (req, res) => {
    res.send(req.user)
})
    

module.exports = router;