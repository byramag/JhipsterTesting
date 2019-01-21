const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const bcrypt = require('bcrypt');
//const session = require('express-session');

const port = 8080 || process.env.port;
const app = express();
//app.use('/', express.static('TAMANAGEMENTAPP'));

var con = mysql.createConnection({
  host: "104.196.121.215",
  user: "tester",
  password: "vcu",
  database: 'tamanagement',
  //port: 8080
});

console.log('Waiting for database...');
con.connect(function(err) {
  if (err){
    console.log("error connecting", err);
    throw err;
  }else{
      con.query("SELECT * FROM TA", function (err, result, fields) {
      console.log(result);
    });
  console.log("Connected!");
  }
});

// const initDB = function() {
//   return new Promise((resolve, reject) => {
//     con.connect(err => {
//       if (err) {
//         console.error('Unable to connect to database.', err);
//         console.error('Retrying in 5s.');
//         setTimeout(() => initDB().then(resolve), 5000);
//       } else {
//         console.log('Connected.');
//         resolve();
//       }
//     });
//   });
// };

// const query = function(str, ...params) {
//   return new Promise((resolve, reject) => {
//     con.query(str, params, (error, results, fields) => {
//       if (error) {
//         reject(error);
//         console.error({
//           invocation: [str, ...params],
//           error
//         });
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };

// initDB().then(() => {
//   app.listen(port);
//   console.log(`Running on port ${port}.`);
// });
