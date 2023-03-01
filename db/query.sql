USE Employee_tracker_db;

select * from department;

select * from role;


select * from employee;


select d.id,d.name, r.id,r.title,r.salary from department d, role r
where d.id = r.id ;



select e.id,e.first_name,e.last_name,e.role_id,r.title,r.salary,d.name, m.first_name
 as 'Manager first Name',m.last_name as 'Manager Lastname'  from employee e
 left join role r on e.role_id = r.id left join department d on r.department_id = d.id
 left join employee m on e.manager_id = m.id;
