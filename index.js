const express = require('express')
//var exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config({path: "./.env"}); //for sensitive information

const path = require('path')
const app = express()
const port = 3000

const mysql = require("mysql");

/*const bodyParser = require("body-parser");
/app.use(bodyParser.json);*/

const mysqlConnection = mysql.createConnection
({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  multipleStatements: true
});

mysqlConnection.connect((err)=>
{
  if(!err)
  {
    console.log("Connected");
  }
  else
  {
    //console.log(err);
    console.log("Connection failed");
  }
});


//app.engine('handlebars', exphbs());
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false})); //parse URL-encoded bodies(as sent by HTML forms)
app.use(express.json()); //parse JSON bodies (as sent by API clients)

app.use(express.static(path.join(__dirname, "./public")))
app.use('/', require('./routes/myroutes'))
app.use("/auth", require("./routes/auth"))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})