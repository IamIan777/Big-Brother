const inquirer = require('inquirer');
const askTask = require('../index');

const connection = require('../config/connection');
const { allDepts } = require('../db/queries');
const { getAllDepts } = require('./getAll');

const addRole = async() => {
    const allDepts = await getAllDepts()
    const answers = await inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'list',
            name: 'deptId',
            message: 'What is the department for this role?',
            choices: allDepts
        }
    ])
    await connection.queryPromise(
        "INSERT INTO roles SET ?", {
            title: answers.title,
            salary: answers.salary,
            department_id: Number(answers.deptId),
        }
    );
    console.log('The role was added successfully!');
};
