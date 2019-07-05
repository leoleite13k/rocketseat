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

  projects.map(item => {
    if (item.id === id) {
      return next();
    }
  });

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

  projects.map((item, index) => {
    if (item.id === id) {
      projects.splice(index, 1, {
        id: item.id,
        title: title,
        tasks: item.tasks
      });
    }
  });

  return res.json(projects);
});

server.delete("projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  projects.map((item, index) => {
    if (item.id === id) {
      projects.splice(index, 1);
    }
  });

  return res.send();
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;

  projects.map((item, index) => {
    if (item.id === id) {
      projects.splice(index, 1);
    }
  });

  return res.send();
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map((item, index) => {
    if (item.id === id) {
      let newTasks = item.tasks;
      newTasks.push(title);

      projects.splice(index, 1, {
        id: item.id,
        title: item.title,
        tasks: newTasks
      });
    }
  });

  return res.json(projects);
});

server.listen(3000);
