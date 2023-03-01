DROP DATABASE IF EXISTS Employee_tracker_db;
CREATE DATABASE Employee_tracker_db;

USE Employee_tracker_db;

CREATE TABLE department (
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT auto_increment PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT references department(id) on delete cascade);
    
CREATE TABLE employee(
    id INT auto_increment PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT references role(id) ,
    manager_id INT references employee(id) on delete set null)
;