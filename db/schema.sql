DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(title)
    ON DELETE CASCADE
    employee_salary INT NOT NULL,
    FOREIGN KEY (employee_salary)
    REFERENCES department(salary)
    ON DELETE CASCADE
    employee_department INT,
    FOREIGN KEY (employee_department)
    REFERENCES roles(department_id)
    ON DELETE CASCADE
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE CASCADE
);

