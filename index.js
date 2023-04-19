const inquirer = require("inquirer");
const questTask = require('../controllers/taskQuestion');
const addDept = require('../controllers/addDept');
const addEmployee = require('../controllers/addEmployee');
const addRole = require('../controllers/addRole');
const updateEmployee = require('../controllers/updateEmployee');
const viewByManager = require('../controllers/viewByManager')
const toDeleteDept = require('../controllers/toDeleteDept');
const toDeleteEmployee = require('../controllers/toDeleteEmployee');
const toDeleteRole = require('../controllers/toDeleteRole');
const dal = require('../controllers/dal');
const queries = require('../db/queries');

const askTask = () => {
    inquirer
        .prompt(questTask)
        .then((answers) => {
            const task = answers.task;
            if (task === 'View all employees') {
                dal.viewAll(queries.allEmployees).then((res) => askTask());
            } else if (task === 'View employees by manager') {
                viewByManager()
                    .then((answers) => dal.viewAllBy(queries.allEmployeesByMng, 'm.id', answers.managerId))
                    .then(() => askTask());
            } else if (task === 'View all roles') {
                dal.viewAll(queries.allRoles)
                    .then(() => askTask());
            } else if (task === 'View all departments') {
                dal.viewAll(queries.allDepts)
                    .then(() => askTask());
            } else if (task === 'Add employee') {
                addEmployee(askTask)
            } else if (task === 'Add role') {
                addRole().then(() => askTask());
            } else if (task === 'Add department') {
                addDept(askTask);
            } else if (task === 'Update employee') {
                updateEmployee().then(() => askTask());
            } else if (task === 'Delete employee') {
                toDeleteEmployee()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'employees', Number(answers.empToDelete)))
                    .then(() => askTask());
            } else if (task === 'Delete role') {
                toDeleteRole()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'roles', Number(answers.roleToDelete)))
                    .then(() => askTask());
            } else if (task === 'Delete department') {
                toDeleteDept()
                    .then((answers) => dal.deleteFrom(queries.deleteId, 'departments', Number(answers.deptToDelete)))
                    .then(() => askTask());
            } else {
                process.exit();
            }
        })
        .catch((err) => console.log(err));
};

askTask();

module.exports = askTask;