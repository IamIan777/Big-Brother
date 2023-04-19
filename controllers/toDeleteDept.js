
const inquirer = require('inquirer');
const { getAllDepts } = require('./getAll');

const toDeleteDept = () => {
    return new Promise((resolve, reject) => {
        getAllDepts()
            .then((allDepts) =>
                inquirer.prompt([{
                    type: 'list',
                    name: 'deptToDelete',
                    message: "Which department would you like to delete?",
                    choices: allDepts
                }, ])
            )
            .then((answers) => resolve(answers))
            .catch((err) => reject(err))
    });
};

module.exports = toDeleteDept;