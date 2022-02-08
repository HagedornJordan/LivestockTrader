var mysql = require('mysql2')
require('dotenv').config({ path: '../.env' })
var moment = require('moment');
const bcryptFunctions = require('./bcrytFunctions');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'mydb'
})

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
connection.connect((err) => {
  if (err) throw err;
  resetDatabase();
});

const executeQuery = (query, params) => {
      return new Promise((resolve, reject) => {
        connection.query(query, params, (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
    })
}

var initializeDatabase = () => {
  console.log("initalizing");
  connection.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), registerDate DATE, permission INT)", (err, res) => {
  if (err) throw err;
  })
  connection.query("CREATE TABLE logs (id INT AUTO_INCREMENT PRIMARY KEY, time DATE, userId INT, request VARCHAR(510))", (err, res) => {
    if (err) throw err;
  })
  connection.query("CREATE TABLE roles (id INT AUTO_INCREMENT PRIMARY KEY, roleName VARCHAR(255), roleDescription VARCHAR(255))", (err, res) => {
    if (err) throw err;
  })
  connection.query("CREATE TABLE userToRole (userId INT, roleId INT)", (err, res) => {
    if (err) throw err;
  })
};

const resetDatabase = async () => {
  connection.query("DROP TABLE users");
  connection.query("DROP TABLE roles");
  connection.query("DROP TABLE userToRole");
  connection.query("DROP TABLE logs");
  initializeDatabase();
  seedAdmin();
}


const seedAdmin = async () => {
  const passwordHash = await bcryptFunctions.generateHash(process.env.ADMIN_PASSWORD);
  const admin = await createUser(process.env.ADMIN_EMAIL, process.env.ADMIN_USERNAME, passwordHash);
  const role = await createRole("Administrator", "Full Permissions");
  console.log(admin); console.log(role)
  assignRole(admin.insertId, role.insertId)
}

const userExists = async (username) => {
  const res = await executeQuery('SELECT * FROM users WHERE name =?', [username]);
  return res.length > 0;
}

var emailExists = async (email) => {
  const res = await executeQuery('SELECT * FROM users WHERE email =?', [email]); 
    return res.length > 0;
}

const createUser = async (email, username, password) => {
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const res = await executeQuery("INSERT INTO users(name, email, password, registerDate) VALUES (?, ?, ?, ?)", [username, email, password, mysqlTimestamp]);
  return res;
}

const createRole = async(roleName, roleDescription) => {
  const res = await executeQuery("INSERT INTO roles(roleName, roleDescription) VALUES (?, ?)", [roleName, roleDescription]);
  return res;
}

const assignRole = async(userId, roleId) => {
  const res = await executeQuery("INSERT INTO userToRole(userId, roleId) VALUES (?, ?)", [userId, roleId]);
}

const getUserByUsername = async (username) => {
  const res = await executeQuery("SELECT * FROM users WHERE name=?", [username]);
  console.log(res)
  return res;
}

const createLog = async (userId, requestTime, request) => {
  const res = await executeQuery("INSERT INTO logs(time, userId, request) VALUES (?, ?, ?)",[requestTime, userId, request])
  console.log(res);
  return res;
}

module.exports = {initializeDatabase, userExists, emailExists, createUser, getUserByUsername, createLog}