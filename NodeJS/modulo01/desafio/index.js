const express = require("express");

const server = express();

const projects = [];
var count = 0;

server.use(express.json());

server.use((req, res, next) => {
  count = count + 1;

  console.log(`Número de requisições ${count}`);

  next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;

  const projectIndex = projects.findIndex(prj => prj.id === id);

  if (projectIndex >= 0) {
    return next();
  }

  return res.status(400).json({ error: "Projeto não existente" });
}

server.post("/projects", (req, res) => {
  projects.push(req.body);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(prj => prj.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(prj => prj.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(prj => prj.id === id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
