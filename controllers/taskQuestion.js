const inquirer = require('inquirer');
const colors = require('colors');

const questTask = [{
    type: 'list',
    name: 'task',
    message: 'What would you like to do?'.brightCyan,
    choices: [
        new inquirer.Separator('=== VIEW INFO ==='.magenta),
        'View all employees',
        'View employees by manager',
        'View all roles',
        'View all departments',
        new inquirer.Separator('=== ADD NEW INFO ==='.magenta),
        'Add employee',
        'Add role',
        'Add department',
        new inquirer.Separator('=== UPDATE INFO ==='.magenta),
        'Update employee',
        new inquirer.Separator('=== DELETE INFO ==='.magenta),
        'Delete employee',
        'Delete role',
        'Delete department',
        new inquirer.Separator('=== EXIT ==='.magenta),
        'Exit Application'.brightMagenta,
    ],
    pageSize: 18
}];

module.exports = questTask;