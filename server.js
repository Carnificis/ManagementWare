const inquirer = require('inquirer');
const mysql = require('mysql2');
 require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker_db'
});

db.connect(function (err){
    if(err) throw err;
    initialQ()
})
const initialQuestion = [
    {
       type: 'list',
     message: 'What would you like to do?',
     choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
     name: 'option',
       }]

function initialQ () {
inquirer.prompt(initialQuestion)
.then(ans=>{
    console.log(ans);
    // ans.option === "want to try again" ? initialQ() : process.exit();
    switch (ans.option) {
        case "View All Employees":
            selectAllEmp()
            break;
        case "Add Employee":
            addEmp()
            break;

        case "Update Employee Role":
            updateEmpRole()
            break;

        case "View All Roles":
            selectAllRoles()
            break;

        case "Add Role":
            addRole()
            break;

        case "View All Departments":
            selectAllDept()
            break;

        case "Add Department":
            addDept()
            break;

         case "Quit":
            db.end()
                process.exit(0);

      
    }
})
}


function selectAllEmp() {
     db.query("set status by employee"),
     function (err, results){
        if (err) throw err;
        console.table(results);
        initialQ();
     }
   
}