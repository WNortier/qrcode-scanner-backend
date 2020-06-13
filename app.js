//@ts-nocheck
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoConnect = require('./util/database').mongoConnect;

const dataRoutes = require('./controllers/persons');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(dataRoutes.routes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

let PORT = process.env.PORT || 4010;

mongoConnect(() => {
  app.listen(PORT);
});

console.log(`App start on port ${PORT}`);
