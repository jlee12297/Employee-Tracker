const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

db.connect(err => {
  if (err) throw err;
  console.log("Connected!");
  console.log("Welcome to the Employee Tracker App!")
  start();
});

const start = ()=>{
    inquirer.prompt([
         {
        type:"list",
        choices:["View ALL Departments","View ALL Roles", "View ALL Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
        message:"Please make a selection: ",
        name:"selection"
        }
]).then(ans=>{
     if(ans.selection==="View ALL Departments"){
            viewDepartments()
        } else if(ans.selection==="View ALL Roles"){
            viewRoles()
        } else if(ans.selection==="View ALL Employees"){
            viewEmployees()
        } else if(ans.selection==="Add a Department"){
            addDepartment()
        } else if(ans.selection==="Add a Role"){
            addRole()
        } else if(ans.selection==="Add an Employee"){
            addEmployee()
        } else {
            updateEmployeeRole()
        }
    })
}



