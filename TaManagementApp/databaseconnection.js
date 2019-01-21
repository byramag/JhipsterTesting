//node databaseconnection.js -> command line
//query by...
// con.query("SELECT * FROM course", function (err, result, fields) {
      //console.log(result); (you can do whenever you want with result in here)
    //});
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
});

console.log('Waiting for database...');
con.connect(function(err) {
  if (err){
    console.log("error connecting", err);
    throw err;
  }else{
     // con.query("SELECT * FROM course", function (err, result, fields) {
      //console.log(result);
    //});
  console.log("Connected!");
  }
});

const query = function(str, ...params){
  return new Promise((resolve, reject) => {
    con.query(str, param, (err, result, fields) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    });
  });
};
