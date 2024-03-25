    const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

app.use( (req, res, next) => {
  const date = new Date().toISOString();
  console.log(`Request ${req.method} on path ${req.url} ${date}`);
  next(); 
});


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>HOME</title>
      </head>
      <body>
        <p>HOME</p>
      </body>
    </html>
  `);
});

app.post('/student', (req, res) => {
  const { name, lastname, studyField } = req.body;
  students.push({ name, lastname, studyField });
  res.send(`Hello, ${name} ${lastname} on ${studyField} studies!`);
});

app.get('/add-student', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>ADD-STUDENT</title>
  </head>
    <body>
      <form method="POST" action="/student">
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="lastname" placeholder="lastname" />
        <input type="text" name="studyField" placeholder="tudyField" />
        <input type="submit" value="Submit">
      </form>

    </body>
  </html>

  `);
});



app.get('/users', (req, res) => {
  const userList = students.map(student => `<p>${student.name} ${student.lastname} - ${student.studyField}</p>`).join('');
  res.send(`
    <html>
      <head>
        <title>USERS</title>
      </head>
      <body>
        <ul>${userList}</ul>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});