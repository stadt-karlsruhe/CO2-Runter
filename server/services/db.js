const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'db_co2runter' // database name MYSQL_HOST_IP: mysql_db
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