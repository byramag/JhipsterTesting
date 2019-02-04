//node databaseconnection.js -> command line
//query by...
// con.query("SELECT * FROM course", function (err, result, fields) {
      //console.log(result); (you can do whenever you want with result in here)
    //});
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 8080 || process.env.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', express.static('src/app'));
app.set('port', port);

const router = express.Router();
app.use('/api', router);


let con = mysql.createConnection({
  host: '104.196.121.215',
  user: 'tester',
  password: 'vcu',
  database: 'tamanagement',
});

console.log('Waiting for database...');
con.connect(function(err) {
  if (err) {
    console.log('error connecting', err);
    throw err;
  } else {
      //con.query("SELECT * FROM course", function (err, result, fields) {
     //console.log(result);
     //});
  console.log('Connected!');
  }
});

const query = function(str, ...params) {
  return new Promise((resolve, reject) => {
    con.query(str, params, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


app.get('infoDB', function(req, res) {
  con.query('SELECT * FROM course', function (err, result, fields) {
    if (err) {
      console.log('error in get info db');
      throw err;
    } else {
      console.log('sucessfully sent result');
     res.send(result);
  }
  });
});


app.listen(port, function() {
  console.log('app is running at http://localhost:' + port + '/');
});

app.get('/', function(req, res) {
  res.sendFile('/' + 'src/app/class-list-screen/class-list-screen.component.html');
});

router.get('/courses', async(req, rest) =>
{
  const coursearray = await con.query('SELECT * FROM course');
  const course = {
    courseName: [],
    courseDept: [],
    courseNo: [],
    courseDesc: []
  }
  res.json(coursearray);
});

module.exports = con;
