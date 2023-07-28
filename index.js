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

    function initialize() {
        inquirer
          .prompt([
            {
              type: 'list',
              message: 'What would you like to do?',
              name: 'task',
              choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
              ],
            }
          ])
          .then(answers => {
            if (answers.task === "View All Employees") {
              viewEmployees();
            };
            if (answers.task === "Add Employee") {
              addEmployee();
            };
            if (answers.task === "Update Employee Role") {
              updateEmployeeRole();
            };
            if (answers.task === "View All Roles") {
              viewRoles();
            };
            if (answers.task === "Add Role") {
              addRole();
            };
            if (answers.task === "View All Departments") {
              viewDepartments();
            };
            if (answers.task === "Add Department") {
              addDepartment();
            };
            if (answers.task === "Quit") {
              process.exit();
            };
          });
      };
      const viewEmployees = () => {
        const Query = `SELECT employees.id, 
        employees.first_name, 
        employees.last_name,
        roles.title AS title,
        roles.salary AS salary,
        departments.dept_name AS departments,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager 
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id
        ORDER by employees.id`;
        db.query(Query, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        initialize()
  })
};
let employeeQuestions = [
    {
        name: "first_name",
        type: "input",
        message: "Enter employee's First Name.",
    },
    {
        name: "last_name",
        type: "input",
        message: "Enter employee's Last Name.",
    },
    {
        name: "role_id",
        type: "input",
        message: "Enter number for employee's Role ID",
    },
];
function addEmployee() {
    inquirer.prompt(employeeQuestions).then((data) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
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
    db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    initialize();
            })
        })
    })
};

let updateQuestions = [
    {
        name: "employee_id",
        type: "input", 
        message: "Enter a number to update employee ID",
    },
    {
        name: "role_id",
        type: "input",
        message: "Enter a number to update role ID."
    }
];

function updateEmployeeRole() {
    inquirer.prompt(updateQuestions).then((data) => {
    const sql = `UPDATE employees
    SET role_id = (?) WHERE id = (?)`;
    const newData = [data.role_id, data.employee_id];
    db.query(sql, newData, (err) => {
    if (err) throw err;
    console.log('Employee Successfully updated!')
    db.query(`SELECT * FROM employees`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    initialize()
            })
        })

    })
};
function viewRoles() {
    let query = `SELECT * FROM roles`;
    db.query(query, (err, rows) => {
    if (err) throw err;
    console.table(rows)
    initialize()
    })
};
let roleQuestions = [
    {
        name: "title",
        type: "input",
        message: "Enter the title of the role you would like to add.",
    },
    {
        name: "salary",
        type: "input", 
        message: "Enter a the amount for the role's salary."
    },
    {
        name: "department_id",
        type: "input",
        message: "Please enter the Department ID for the role you are adding.",
    },
];
function addRole() {
    inquirer.prompt(roleQuestions).then((data) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`;
    const newData = [data.title, data.salary, data.department_id];
    db.query(sql, newData, (err) => {
    if (err) throw err;
    console.log('Your role has been sucessfully added to the database!');
    db.query(`SELECT * FROM roles`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    initialize()
            })
        })
    })
};
const viewDepartments = () => {
    const sql = `SELECT departments.id, 
    departments.dept_name 
    FROM departments`;
    db.query(sql, (err, rows) => {
    if (err) {
    throw err;
      }
    console.table(rows);
    initialize();
    })
  };
  let departmentQuestion = [
    {
        type: "input",
        name: "department_name",
        message: "Enter Department you would like to add."
    }
];
  function addDepartment() {
    inquirer.prompt(departmentQuestion).then((data) => {
    const sql = `INSERT INTO departments (dept_name)
    VALUES (?)`;
    const newData = [data.dept_name];
    db.query(sql, newData, (err) => {
    if (err) throw err;
    console.log('Your department has been added to the database.');
    db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    initialize();
            })
        })
    })
};
initialize()