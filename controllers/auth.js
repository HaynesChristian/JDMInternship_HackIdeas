const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs'); //for encryption

const mysql = require("mysql");
const async = require('hbs/lib/async');
const mysqlConnection = mysql.createConnection
({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  multipleStatements: true
});


exports.register = (req, res) => 
{
    //console.log(req.body);
    const { emp_id, emp_name, age, dept, password, conf_password } = req.body;

    mysqlConnection.query("SELECT employee_id FROM employee WHERE employee_id = ?",[emp_id], async (error,results) => 
    {
        if(error)
        {
            console.log(error);
        }
        if(results.length > 0)
        {
            return res.render('register',{message: "The entered employee id is already registered !!"});
        }
        else if(password != conf_password)
        {
            return res.render('register',{message: "passwords do not match !!"});
        }

        /* //for encrypting password
        let hashedpassword = await bcrypt.hash(password,8);
        console.log(hashedpassword);
        */

        mysqlConnection.query("INSERT INTO employee SET ?", {employee_id : emp_id, name: emp_name , password : password, age : age, department: dept},
        (error,results) => 
        {
            if(error)
            {
                console.log(error);
            }
            else
            {
                return res.render('register',{message: "Employee registered !!"});
            }   
        });
    });
    res.send("Register Form submitted");
}

exports.login = (req, res) => 
{
    //console.log(req.body);
    const { emp_id, password } = req.body;
    
    mysqlConnection.query("SELECT employee_id, password FROM employee",(error,results) =>
    {
        var flag=0;
        if(error)
        {
            console.log(error);
        }
        else
        {
            for(var i=0; i<results.length; i++)
            {
                if(results[i].employee_id == req.body.employee_id && results[i].password == req.body.password)
                {
                    flag=1;
                    break;
                }
            }
        }
    });
    if(flag==1)
    {
        res.send("Login Successfull");
    }
    else
    {
        res.send("Login Unsuccessfull");
    }   
}