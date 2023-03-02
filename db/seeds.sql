USE employee_tracker_db;

insert into department(name)values
('IT'),
('Marketing'),
('Sales');

insert into role(title,salary,department_id)values
('Manager of Sales',60000,3),
('Manager of Marketing',60000,2),
('Manager of IT', 60000,1);

('Joe','Bloggs',1,1);
insert into employee(first_name,last_name,role_id,manager_id)values
('Matt', 'Smith',2,null),
('John', 'Jones',3,null);

