var mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });
var moment = require("moment");
const bcryptFunctions = require("./bcrytFunctions");

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ROOTUSER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB || "mydb"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

const initializeDatabase = () => {
  console.log("Initalizing");
  connection.query(
    "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), registerDate DATE, permission INT)",
    (err, res) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE logs (id INT AUTO_INCREMENT PRIMARY KEY, time DATE, userId INT, request VARCHAR(510))",
    (err, res) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE roles (id INT AUTO_INCREMENT PRIMARY KEY, roleName VARCHAR(255), roleDescription VARCHAR(255))",
    (err, res) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE userToRole (userId INT, roleId INT)",
    (err, res) => {
      if (err) throw err;
    }
  );
  connection.query(
    "CREATE TABLE animals (id INT AUTO_INCREMENT PRIMARY KEY, dateAdded DATE, dateAvailable DATE, type VARCHAR(255), breed VARCHAR(255), title VARCHAR(255), age VARCHAR(255), description VARCHAR(255), sex VARCHAR(255))",
    (err, res) => {
      if (err) throw err;
    }
  );
  seedAdmin();
};

const resetDatabase = async () => {
  connection.query("DROP TABLE users");
  connection.query("DROP TABLE roles");
  connection.query("DROP TABLE userToRole");
  connection.query("DROP TABLE logs");
  connection.query("DROP TABLE animals");
  console.log("Tables dropped");
  initializeDatabase();
  seedAdmin();
  console.log("DB Reinitialized");
};

const seedAdmin = async () => {
  const passwordHash = await bcryptFunctions.generateHash(
    process.env.ADMIN_PASSWORD
  );
  const admin = await createUser(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_USERNAME,
    passwordHash
  );
  const role = await createRole("Administrator", "Full Permissions");
  assignRole(admin.insertId, role.insertId);
};

const userExists = async username => {
  const res = await executeQuery("SELECT * FROM users WHERE name =?", [
    username
  ]);
  return res.length > 0;
};

var emailExists = async email => {
  const res = await executeQuery("SELECT * FROM users WHERE email =?", [email]);
  return res.length > 0;
};

const createUser = async (email, username, password) => {
  var mysqlTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const res = await executeQuery(
    "INSERT INTO users(name, email, password, registerDate) VALUES (?, ?, ?, ?)",
    [username, email, password, mysqlTimestamp]
  );
  return res;
};

const createRole = async (roleName, roleDescription) => {
  const res = await executeQuery(
    "INSERT INTO roles(roleName, roleDescription) VALUES (?, ?)",
    [roleName, roleDescription]
  );
  return res;
};

const assignRole = async (userId, roleId) => {
  const res = await executeQuery(
    "INSERT INTO userToRole(userId, roleId) VALUES (?, ?)",
    [userId, roleId]
  );
};

const getUserByUsername = async username => {
  const res = await executeQuery("SELECT * FROM users WHERE name=?", [
    username
  ]);
  return res;
};

const createLog = async (userId, requestTime, request) => {
  const res = await executeQuery(
    "INSERT INTO logs(time, userId, request) VALUES (?, ?, ?)",
    [requestTime, userId, request]
  );
  return res;
};

const getLogs = async () => {
  const res = await executeQuery("SELECT * FROM logs");
  return res;
};

const getAnimals = async () => {
  const res = await executeQuery("SELECT * FROM animals");
  return res;
};

const addAnimal = async (animal, breed, title, description, age, sex) => {
  var mysqlTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const res = await executeQuery(
    "INSERT INTO animals(dateAdded, dateAvailable, type, breed, title, age, description, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      mysqlTimestamp,
      mysqlTimestamp,
      animal,
      breed,
      title,
      age,
      description,
      sex
    ]
  );
  console.log(res);
  return res;
};

module.exports = {
  initializeDatabase,
  resetDatabase,
  userExists,
  emailExists,
  createUser,
  getUserByUsername,
  createLog,
  getLogs,
  addAnimal,
  getAnimals
};
