const inquirer = require('inquirer');
const connection = require('../config/connection');


const { getAllEmp, getAllRoles, getAllManagers } = require('./getAll');


const updateRole = (answers) => {
    return connection.queryPromise('UPDATE employees SET ? WHERE ?', [{ role_id: answers.newRole }, { id: Number(answers.empl) }])
}

const updateManager = (answers) => {
    return connection.queryPromise('UPDATE employees SET ? WHERE ?', [{ manager_id: Number(answers.newManager) }, { id: Number(answers.empl) }])
}

const updateEmployee = () => {
    return Promise.all([getAllEmp(), getAllRoles(), getAllManagers()])
        .then(([allEmployees, allRoles, allManagers]) =>
            inquirer.prompt([{
                    type: 'list',
                    name: 'empl',
                    message: 'Which employee would you like to update?',
                    choices: allEmployees
                },
                {
                    type: 'list',
                    name: 'updateWhat',
                    message: 'What would you like to update?',
                    choices: ['role', 'manager']
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: "What is the employee's new role?",
                    choices: allRoles,
                    when: (answers) => answers.updateWhat === 'role'
                },
                {
                    type: 'list',
                    name: 'mngYorN',
                    message: "Does the employee still have a manager?",
                    choices: ['yes', 'no'],
                    when: (answers) => answers.updateWhat === 'manager'
                },
                {
                    type: 'list',
                    name: 'newManager',
                    message: "Who is the employee's new manager?",
                    choices: allManagers,
                    when: (answers) => answers.updateWhat === 'manager',
                }
            ])).then((answers) => {
            if (answers.updateWhat === "role") {
                return updateRole(answers);
            } else {
                return updateManager(answers);
            }

        }).catch((err) => console.log(err));
};

module.exports = updateEmployee