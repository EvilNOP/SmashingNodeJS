const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const sequelize = new Sequelize('todo', 'root', 'Chaoyong12.', {
  host: 'localhost',
  dialect: 'mysql'
});

const Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  date: Sequelize.DATE
});

const Task = sequelize.define('Task', {
  title: Sequelize.STRING
});

Task.belongsTo(Project);
Project.hasMany(Task);

sequelize.sync();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.delete('/project/:id', (req, res, next) => {

});

app.post('/projects', (req, res, next) => {

});

app.get('/project/:id/task', (req, res, next) => {

});

app.post('/project/:id/tasks', (req, res, next) => {

});

app.delete('/task/:id', (req, res, next) => {

});

app.listen(3000, () => {
  console.log(' - listening on http://*:3000');
});
