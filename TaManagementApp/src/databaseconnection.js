const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

const port = 4200 || process.env.port;
const app = express();

var con = mysql.createConnection({
  host: "10.142.0.2",
  user: "cs313tams",
  password: "vcu",
  database: 'cs313tams:us-east1:myinstance'
});

con.connect(function (err) {
  if (err) { throw err; }
  console.log("Connected!");
});

const initDB = function () {
  return new Promise((resolve, reject) => {
    db.connect(err => {
      if (err) {
        console.error('Unable to connect to database.', err);
        console.error('Retrying in 5s.');
        setTimeout(() => initDB().then(resolve), 5000);
      } else {
        console.log('Connected to mysql!');
        resolve();
      }
    });
  });
};

console.log('Waiting for database connection...');
initDB().then(() => {
  app.listen(port);
  console.log(`Running on port ${port}.`);
});
