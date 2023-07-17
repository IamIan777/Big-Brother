INSERT INTO departments (department_name)
VALUES 
    ("Sales"),
    ("Marketing"),
    ("Finance"),
    ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Inside Sales Rep", 35000, 1),
    ("Outside Sales Rep", 45000, 1),
    ("Sales Manager", 75000, 1),
    ("Marketing Associate", 40000, 2),
    ("Marketing Manager", 75000, 2),
    ("Financial Analyst", 75000, 3),
    ("Financial Manager", 100000, 3),
    ("Engineer", 100000, 4),
    ("Engineering Manager", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Albert", "Einstein", 1, 4),
    ("Wayne", "Gretski", 1, 4),
    ("Tom", "Holland", 2, 4),
    ("Leonardo", "Dicapprio", 3, null),
    ("John", "Krasinski", 4, 7),
    ("Hannah", "Montana", 4, 7),
    ("Steve", "Rogers", 5, null),
    ("Bruce", "Wayne", 6, 9),
    ("Bruce", "Banner", 7, null),
    ("Joe", "Mcginty", 8, 11),
    ("Donna", "Noble", 9, null);