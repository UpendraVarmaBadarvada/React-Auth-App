CREATE DATABASE Employee;
CREATE TABLE Login (
    id SERIAL PRIMARY KEY,
	userId TEXT NOT NULL,  
    password TEXT NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    address TEXT,
    contactInfo TEXT
);
