USE company_db;

INSERT INTO department (name) VALUES
("Powerlifting"),
("Weightlifting"),
("Bodybuilding"),
("Yoga");

INSERT INTO roles (title,salary,department_id) VALUES
("Powerlifter", 50000, 1),
("Powerlifting Coach", 75000, 2),
("Weightlifter", 30000, 1),
("Weightlifting Coach", 60000, 2),
("Bodybuilder", 55000, 3),
("Bodybuilding Coach", 80000, 3),
("Yogi", 35000, 4),
("Yoga Master", 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
("Joseph", "Franzo", 2, null),
("Lu", "Xiaojun", 4, null),
("Mahatma", "Ghandi", 8, null),
("Arnold", "Schwarznegger", 6, null),
("Josh", "Lee", 1, 1),
("Kyle", "Wong", 3, 2),
("Kevin", "Ling", 5, 4),
("Anne", "Kim", 7, 3);




