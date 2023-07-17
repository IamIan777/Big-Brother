const inquirer = require("inquirer");
const mysql = require("mysql2")
require("dotenv").config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW ,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employees_db database')
    );

function updateEmployee() {
    inquirer.prompt(updateQuestions).then((data) => {
        const sql = `UPDATE employee
        SET role_id = (?) WHERE id = (?)`;
        const newData = [data.role_id, data.employee_id];
        db.query(sql, newData, (err) => {
            if (err) throw err;
            console.log('Employee Successfully updated!')
            db.query(`SELECT * FROM employee`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                init()
            })
        })

    })
};

let updateQuestions = [
    {
        name: "employee_id",
        type: "input", 
        message: "Please enter a numerical value for the employee you want to update's ID",
    },
    {
        name: "role_id",
        type: "input",
        message: "Please enter a numerical value for the employee's new Role ID."
    }
];
function init() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'option',
            message: 'Welcome! What would you like to do?',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ],
        }
    )
    .then((selection) => {
        switch (selection.option) {
            case 'View all Departments':
                viewAllDepartments();
                break;
            case 'View all Roles':
                viewAllRoles();
                break;
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
}

function viewAllEmployees() {
    let query = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS job_title,
    department.department_name,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    ORDER by employee.id`;
    db.query(query, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        init()
    })
};

function viewAllDepartments() {
    let query = `SELECT * FROM department`;
    db.query(query, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        init()
    })
};

function viewAllRoles() {
    let query = `SELECT * FROM role`;
    db.query(query, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        init()
    })
};

let departmentQuestion = [
    {
        type: "input",
        name: "department_name",
        message: "Please enter the Department you would like to add."
    }
];function addDepartment() {
    inquirer.prompt(departmentQuestion).then((data) => {
        const sql = `INSERT INTO department (department_name)
        VALUES (?)`;
        const newData = [data.department_name];
        db.query(sql, newData, (err) => {
            if (err) throw err;
            console.log('Your department has been added to the database.');
            db.query(`SELECT * FROM department`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                init();
            })
        })
    })
};

let roleQuestions = [
    {
        name: "title",
        type: "input",
        message: "Please enter the title of the role you would like to add.",
    },
    {
        name: "salary",
        type: "input", 
        message: "Please enter a numerical value for this role's salary."
    },
    {
        name: "department_id",
        type: "input",
        message: "Please enter the Department ID for the role you are adding.",
    },
];

function addRole() {
    inquirer.prompt(roleQuestions).then((data) => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
        const newData = [data.title, data.salary, data.department_id];
        db.query(sql, newData, (err) => {
            if (err) throw err;
            console.log('Your role has been sucessfully added to the database!');
            db.query(`SELECT * FROM role`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                init()
            })
        })
    })
};

let employeeQuestions = [
    {
        name: "first_name",
        type: "input",
        message: "Please enter the new employee's First Name.",
    },
    {
        name: "last_name",
        type: "input",
        message: "Please enter the new employee's Last Name.",
    },
    {
        name: "role_id",
        type: "input",
        message: "Please input a numerical value for the employee's Role ID",
    },
    {
        name: "manager_id",
        type: "input", 
        message: "Please input a numerical value for the employee's Manager's ID.",
    }
];

function addEmployee() {
    inquirer.prompt(employeeQuestions).then((data) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const newData = [
            data.first_name,
            data.last_name,
            data.role_id,
            data.manager_id,
        ];
        db.query(sql, newData, (err) => {
            if (err) throw err;
            console.log('Your employee has been added to the database!');
            db.query(`SELECT * FROM employee`, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                init();
            })
        })
    })
};