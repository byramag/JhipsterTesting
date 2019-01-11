const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

const port = 4242 || process.env.port;
const app = express();

var con = mysql.createConnection({
  host: "",
  user: "cs313tams",
  password: "vcu",
  database: 'cs313tams:us-east1:myinstance'
});

con.connect(function(err) {
  if (err){ throw err;}
  console.log("Connected!");
});
