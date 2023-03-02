const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employee_tracker_db",
});

db.connect(function (err) {
  if (err) throw err;
  initialQ();
});

const initialQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
    name: "option",
  },
];

function initialQ() {
  inquirer.prompt(initialQuestion).then((ans) => {
    console.log(ans);
    switch (ans.option) {
      case "View All Employees":
        selectAllEmp();
        break;
      case "Add Employee":
        addEmp();
        break;
      case "Update Employee Role":
        updateEmpRole();
        break;
      case "View All Roles":
        selectAllRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        selectAllDept();
        break;
      case "Add Department":
        addDept();
        break;
      case "Quit":
        db.end();
        process.exit(0);
    }
  });
}

function updateEmpRole() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    const employeeList = results.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          name: "employeeId",
          choices: employeeList,
        },
        {
          type: "input",
          message: "Enter the new role ID:",
          name: "newRoleId",
        },
      ])
      .then((answers) => {
        const { employeeId, newRoleId } = answers;
        db.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [newRoleId, employeeId],
          (err, results) => {
            if (err) throw err;
            console.log(`Employee's role updated successfully!`);
            initialQ();
          }
        );
      });
  });
}

function addEmp() {
  let managerList = [];
  let roleList = [];
  db.query(
    "SELECT * FROM employee where manager_id is null;",
    (err, results) => {
      if (err) throw err;
      managerList = results.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      db.query("select * from role;", (err, results) => {
        if (err) throw err;
        roleList = results.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Enter employee first name:",
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter employee last name:",
            },
            {
              type: "list",
              name: "role_id",
              message: "Enter employee role ID:",
              choices: roleList,
            },
            {
              type: "list",
              name: "manager_id",
              message: "Enter employee manager ID:",
              choices: managerList,
            },
          ])
          .then((answers) => {
            const { first_name, last_name, role_id, manager_id } = answers;
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(
              sql,
              [first_name, last_name, role_id, manager_id],
              (error, results, fields) => {
                if (error) console.error(error);
                return;
              }
            );
            console.log("Employee added successfully!");
            initialQ();
          });
      });
    }
  );
}

function addDept() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    })
    .then(({ name }) => {
      // Build the SQL insert statement
      const sql = "INSERT INTO department SET ?";

      // Execute the insert statement with the provided parameters
      db.query(sql, { name }, (error, results, fields) => {
        if (error) {
          // Display an error message to the user if the insert statement fails
          console.error(error);
          console.log("Failed to add department");
        } else {
          // Display a success message to the user if the insert statement succeeds
          console.log(`Added department ${name}`);
          initialQ();
        }
      });
    });
}
function addRole() {
  let departmentList = [];

  db.query("SELECT * FROM department ;", (err, results) => {
    if (err) throw err;
    departmentList = results.map((department) => ({
      name: `${department.name} department`,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary?",
        },
        {
          type: "list",
          name: "department",
          choices: departmentList,
          message: "What is the department?",
        }
       ] )
      .then(({ title, salary, department }) => {
        // Build the SQL insert statement
        const sql =
          "insert into role(title,salary,department_id)values (?,?,?);";

        // Execute the insert statement with the provided parameters
        db.query(sql, [title, salary, department], (error, results, fields) => {
          if (error) {
            // Display an error message to the user if the insert statement fails
            console.error(error);
            console.log("Failed to add role");
          } else {
            // Display a success message to the user if the insert statement succeeds
            console.log(`Added role ${title}}`);
            initialQ();
          }
        });
      });
  });
}
function selectAllEmp() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    initialQ();
  });
}

function selectAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    initialQ();
  });
}
function selectAllDept() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    initialQ();
  });
}

// const inquirer = require("inquirer");
// const mysql = require("mysql2");
// const consoleTable = require("console.table");

// const db = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "rootroot",
//   database: "employee_tracker_db",
// });

// db.connect(function (err) {
//   if (err) throw err;
//   initialQ();
// });
// const initialQuestion = [
//   {
//     type: "list",
//     message: "What would you like to do?",
//     choices: [
//       "View All Employees",
//       "Add Employee",
//       "Update Employee Role",
//       "View All Roles",
//       "Add Role",
//       "View All Departments",
//       "Add Department",
//       "Quit",
//     ],
//     name: "option",
//   },
// ];

// function initialQ() {
//   inquirer.prompt(initialQuestion).then((ans) => {
//     console.log(ans);
//     // ans.option === "want to try again" ? initialQ() : process.exit();
//     switch (ans.option) {
//       case "View All Employees":
//         selectAllEmp();
//         break;
//       case "Add Employee":
//         addEmp();
//         break;

//       case "Update Employee Role":
//         updateEmpRole();
//         break;

//       case "View All Roles":
//         selectAllRoles();
//         break;

//       case "Add Role":
//         addRole();
//         break;

//       case "View All Departments":
//         selectAllDept();
//         break;

//       case "Add Department":
//         addDept();
//         break;

//       case "Quit":
//         db.end();
//         process.exit(0);
//     }
//   });
// }
// function updateEmpRole() {
//     // First, get the list of employees from the database
//     db.query("SELECT * FROM employee", (err, results) => {
//       if (err) throw err;

//       // Then, map the results to an array of employee names and ids
//       const employeeList = results.map((employee) => ({
//         name: `${employee.first_name} ${employee.last_name}`,
//         value: employee.id,
//       }));

//       // Finally, prompt the user to select an employee and a new role
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             message: "Which employee's role do you want to update?",
//             name: "employeeId",
//             choices: employeeList,
//           },
//           {
//             type: "input",
//             message: "Enter the new role ID:",
//             name: "newRoleId",
//           },
//         ])
//         .then((answers) => {
//           const { employeeId, newRoleId } = answers;

//           // Update the employee's role in the database
//           db.query(
//             `UPDATE employee SET role_id = ? WHERE id = ?`,
//             [newRoleId, employeeId],
//             (err, results) => {
//               if (err) throw err;
//               console.log(`Employee's role updated successfully!`);
//               initialQ();
//             }
//           );
//         });
//     });
//   }
// function addEmp() {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter employee name:'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter employee salary:'
//     },
//     {
//       type: 'input',
//       name: 'department',
//       message: 'Enter employee department:'
//     }
//   ]).then(answers => {
//     const name = answers.name;
//     const salary = answers.salary;
//     const department = answers.department;

//     const sql = `INSERT INTO employee (name, salary, department) VALUES ('${name}', ${salary}, '${department}')`;

//     connection.query(sql, (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         return;
//       }
//       console.log('Employee added successfully!');
//       connection.end();
//     });
//   });
// };

// function selectAllEmp() {
//   db.query("SELECT * FROM employee", function (err, results) {
//     if (err) throw err;
//     console.table(results);
//     initialQ();
//   });
// }

// function selectAllRoles() {
//   db.query("SELECT * FROM role", function (err, results) {
//     if (err) throw err;
//     console.table(results);
//     initialQ();
//   });

// }
// function addRole() {
//   db.query("SELECT * FROM role", function (err, results) {
//     if (err) throw err;
//     console.table(results);
//     initialQ();
//   });
// }
// function selectAllDept() {
//   db.query("SELECT * FROM department", function (err, results) {
//     if (err) throw err;
//     console.table(results);
//     initialQ();
//   });
// }
// function addDept() {
//   db.query("SELECT * FROM employee", function (err, results) {
//     if (err) throw err;
//     console.table(results);
//     initialQ();
//   });
// }
// const connection = mysql.createConnection({
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : 'rootroot',
//     database : 'yourdatabase'
//   });

//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to database: ', error);
//       return;
//     }
//     console.log('Connected to database!');
//   });

//   // Now you can use the "connection" object to query the database
//   connection.query(sql, (error, results, fields) => {
//     if (error) {
//       console.error('Error executing query: ', error);
//       return;
//     }
//     console.log('Query results: ', results);
//   });

//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter employee name:'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter employee salary:'
//     },
//     {
//       type: 'input',
//       name: 'department',
//       message: 'Enter employee department:'
//     }
//   ]).then(answers => {
//     const name = answers.name;
//     const salary = answers.salary;
//     const department = answers.department;

//     const sql = `INSERT INTO employee (name, salary, department) VALUES ('${name}', ${salary}, '${department}')`;

//     connection.query(sql, (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         return;
//       }
//       console.log('Employee added successfully!');
//       connection.end();
//     });
//   });
