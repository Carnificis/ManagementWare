const inquirer = require('inquirer');
const fs=require('fs');
const initialQuestion = require('./initialQuestions')

// const initialQuestion = [
//     {
//        type: 'list',
//      message: 'What would you like to do?',
//      choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "want to try again"],
//      name: 'option' 
//     }
// ]
init();
function init(){
    initialQ();
}

function initialQ () {
inquirer.prompt(initialQuestion)
.then(ans=>{
    console.log(ans);
    // ans.option === "want to try again" ? initialQ() : process.exit();
    switch (ans.option) {
        case "want to try again":
            initialQ()
            break;
    
        default:
            break;
    }
})
}