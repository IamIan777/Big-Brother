const inquirer = require('inquirer');
const { getAllManagers } = require('./getAll');

const viewByManager = () => {
    return new Promise((resolve, reject) => {
        getAllManagers()
            .then((allManagers) => {
                return inquirer.prompt([{
                    type: 'list',
                    name: 'managerId',
                    message: 'Which manager would you like to view?',
                    choices: allManagers
                }])
            })
            .then((answers) => resolve(answers))
            .catch((err) => reject(err))
    });
}

module.exports = viewByManager;