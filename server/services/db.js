const mysql = require('mysql2');
const config = require('../config.js');


const db = mysql.createPool({
    host: config.database.db_host, 
    user: config.database.db_user, 
    password: config.database.db_pwd, 
    database: config.database.db_name
  })

async function query(sql, params) {
    console.log("querying")
    const [err, result, fields] = await db.query(sql, params);
    console.log("query done" + result)
    if (err) {
        console.log("Error:" + err)
        return err;
    }
    return result;
}

module.exports = {
    query,
    db
    }
