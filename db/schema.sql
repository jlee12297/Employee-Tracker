DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary INT,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    employee_role VARCHAR(100) NOT NULL,
    FOREIGN KEY (employee_role)
    REFERENCES roles(title)
    ON DELETE CASCADE
    employee_salary INT,
    FOREIGN KEY (employee_salary)
    REFERENCES department(salary)
    ON DELETE CASCADE
    employee_department INT,
    FOREIGN KEY (employee_department)
    REFERENCES roles(department_id)
    ON DELETE CASCADE
    manager INT,
    FOREIGN KEY (employee_department)
    REFERENCES employees(id)
    ON DELETE CASCADE
);

