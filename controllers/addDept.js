const inquirer = require('inquirer');
const connection = require('../config/connection');

const addDept = (askTask) => {
    inquirer.prompt([{
            type: 'input',
            message: 'What is the name of the department?',
            name: 'deptName',
        }])
        .then((answers) => {
            console.log(answers);
            connection.query(
                'INSERT INTO departments SET ?', {
                    dept_name: answers.deptName,
                },
                function(err) {
                    console.log(err)
                    if (err) throw err;
                    console.log('Successfully added new department');
                    askTask();
                });

        })
}

module.exports = addDept;