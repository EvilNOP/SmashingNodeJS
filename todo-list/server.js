const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

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

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', (req, res, next) => {
  Project.findAll().then(projects => {
    res.render('index', { projects: projects });
  }).catch(next);
});

app.delete('/project/:id', (req, res, next) => {
  Project.find(Number(req.params.id)).then(proj => {
    proj.destroy().then(() => {
      res.sendStatus(200);
    }).catch(next);
  }).catch(next);
});

app.post('/projects', (req, res, next) => {
  Project.build(req.body).save().then(obj => {
    res.send(obj);
  }).catch(next);
});

app.get('/project/:id/task', (req, res, next) => {
  Project.find(Number(req.body.params.id)).then(project => {
    project.getTasks().on('success', tasks => {
      res.render('tasks', { project: project, tasks: tasks });
    });
  }).catch(next);
});

app.post('/project/:id/tasks', (req, res, next) => {
  res.body.ProjectId = req.params.id;

  Task.build(req.body).save().then(obj => {
    res.send(obj);
  }).catch(next);
});

app.delete('/task/:id', (req, res, next) => {
  Task.find(Number(req.params.id)).then(task => {
    task.destroy().then(() => {
      res.sendStatus(200);
    }).catch(next);
  }).catch(next);
});

app.listen(3000, () => {
  console.log(' - listening on http://*:3000');
});
