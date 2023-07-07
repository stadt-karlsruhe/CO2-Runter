// config.js
/*
from dockercompose.yaml

x-common-variables: &common-variables
  MYSQL_DATABASE: db_co2runter
  MYSQL_USER: MYSQL_USER
  MYSQL_PASSWORD: MYSQL_PASSWORD
  TOKEN_KEY: adjuhskajdkjas
*/

let dbConfig, authConfig

if (process.env.DOCKER) {
  console.log("Env config")
  dbConfig = {
    db_host: "mysql_db",
    db_name: "db_co2runter",
    db_port: 3306, // external 9906, see docker-compose.yaml
    db_user: process.env.MYSQL_USER,
    db_pwd: process.env.MYSQL_PASSWORD,
  }
  authConfig = {
    token_key: process.env.TOKEN_KEY
  }
} else {
  console.log("File config")
  dbConfig = {
    db_host: 'localhost',
    db_name: "db_co2runter",
    db_port: 3306,
    db_user: '',
    db_pwd: '',
  }
  authConfig = {
    token_key: ""
  }
}

module.exports = {
  database: dbConfig,
  auth: authConfig
};
