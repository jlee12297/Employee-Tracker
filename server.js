const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;

const app = express();

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


start();
