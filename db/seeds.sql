USE Employee_tracker_db;

insert into department(name)values
('IT'),
('Marketing'),
('Sales');

insert into role(title,salary,department_id)values
('Manager of Sales',2421,3),
('Manager of Marketing',2421,2),
('Manager of IT',2421,1);


insert into employee(first_name,last_name,role_id)values
('Joe','Bloggs',1),
('Matt', 'Smith',2),
('John', 'Jones',3);

