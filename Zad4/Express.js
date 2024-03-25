const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

app.use( (req, res, next) => {
  const date = new Date().toISOString();
  console.log(`Request ${req.method} on path ${req.url} ${date}`);
  next(); 
});

app.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
  });


app.route('/student')
  .post((req, res) => {
    const { name, lastname, studyField } = req.body;
    students.push({ name, lastname, studyField });
    res.send(`Hello, ${name} ${lastname} on ${studyField} studies!`);
  });

app.route('/add-student')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/views/add-student.html'));
  });



app.route('/users')
  .get((req, res) => {
    const userList = students.map(student => `<p>${student.name} ${student.lastname} - ${student.studyField}</p>`).join('');
    res.sendFile(path.join(__dirname, '/views/users.html'));
  });




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});