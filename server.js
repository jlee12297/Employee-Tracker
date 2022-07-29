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
  console.log("Welcome to the Employee Tracker App!");
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


const viewDepartments = ()=>{
    db.query(`SELECT department.id AS ID, 
            department.name AS Department FROM department`,(err,data)=>{
        if(err){
            throw err
        }
    console.log("LIST OF ALL DEPARTMENTS")
    console.table(data);
    start();
    })
}

const viewRoles = ()=>{
    db.query(`SELECT roles.id AS Role_ID, 
            roles.title AS Role_Title, 
            department.name AS Department FROM roles 
            INNER JOIN department ON roles.department_id = department.id`,(err,data)=>{
        if(err){
            throw err
        }
    console.log("LIST OF ALL ROLES")
    console.table(data);
    start();
    })
}

const viewEmployees = ()=>{
    db.query(`SELECT employees.id AS Employee_ID, 
                      employees.first_name AS First_Name, 
                      employees.last_name AS Last_Name, 
                      roles.title AS Title, 
                      department.name AS Department,
                      roles.salary AS Salary, 
                      employees.manager_id AS Manager_ID FROM employees
                      LEFT JOIN roles ON employees.role_id = roles.id
                      LEFT JOIN department ON roles.department_id = department.id
                      LEFT JOIN employees manager ON employees.manager_id = manager.id`,(err,data)=>{
        if(err){
            throw err
        }
    console.log("LIST OF ALL EMPLOYEES")
    console.table(data);
    start();
    })
}

const addDepartment = ()=>{
   inquirer.prompt([
        {
        type:"input",
        message:"Name of the department you would like to add?",
        name:"departmentName"
        }
    ]).then(ans=>{
        db.query(`INSERT INTO department (name) VALUES ("` + ans.departmentName + `");`,(err,data)=>{
        if(err){
            throw err
        }
    console.log(ans.departmentName + " has been added successfully!")
    viewDepartments();
    start();
    })
    })
}


const addRole = ()=>{
   inquirer.prompt([
        {
        type:"input",
        message:"Name of the role you would like to add?",
        name:"roleName"
        },
        {
        type:"input",
        message:"What is the salary for this role? (No $ sign needed)",
        name:"salary"
        },
        {
        type:"input",
        message:"Please specify the Department ID for this role: ",
        name:"roleId"
        },
    ]).then(ans=>{
        db.query(`INSERT INTO roles (title,salary,department_id) VALUES 
            ("` + ans.roleName + `", "` + ans.salary + `", "` + ans.roleId + `");`,(err,data)=>{
        if(err){
            throw err
        }
    console.log(ans.roleName + " has been added successfully!")
    viewRoles();
    start();
    })
    })
}

