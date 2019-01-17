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

const initDB = function() {
  return new Promise((resolve, reject) => {
    con.connect(err => {
      if (err) {
        console.error('Unable to connect to database.', err);
        console.error('Retrying in 5s.');
        setTimeout(() => initDB().then(resolve), 5000);
      } else {
        console.log('Connected.');
        resolve();
      }
    });
  });
};

const query = function(str, ...params) {
  return new Promise((resolve, reject) => {
    con.query(str, params, (error, results, fields) => {
      if (error) {
        reject(error);
        console.error({
          invocation: [str, ...params],
          error
        });
      } else {
        resolve(results);
      }
    });
  });
};

con.connect(function(err) {
  if (err){ throw err;}
  console.log("Connected!");
});

console.log('Waiting for database...');
initDB().then(() => {
  app.listen(port);
  console.log(`Running on port ${port}.`);
});