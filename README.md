# Employee-Management
A simple Rest API using node.js ,express(using TypeScript) and MongoDb to manage employee records
## Installation 
Use the package manager [npm](https://www.npmjs.com/) to install dependencies.
```bash
npm install 
```
## config
add the .env file(provided in the email) to the project (outside the src folder)
## lanch
to start the app you just need to 
```bash
npm run dev 
```
## Endpoints
POST "http://localhost:3000/employees" to add an employee 
exemple {"name":"employeeOne",
    "email":"employee@exemple.com",
    "position":"positionOne",
    "department":"departmentThree",
    "salary":1500}
    RQ : Email must be unique and have the correct format. Name and position are required and must be strings. Department and salary are optional, but if specified, salary must be numeric. Otherwise, an appropriate status and message should be generated for errors. 
PUT "http://localhost:3000/employees/:id" to modify an existing employee
DELETE "http://localhost:3000/employees/:id" to delete an employee 