const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

/*const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );
  req.appName = "GoNode";

  return next();
};

app.use(logMiddleware);

app.get("/", logMiddleware, (req, res) => {
  return res.send(`Bem vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/nome/:name", (req, res) => {
  return res.send(`Bem vindo, ${req.params.name}`);
});*/
nunjucks.configure("views", {
  autoscape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");

const users = ["Leonardo", "Lucas", "Otavio"];

app.get("/", (req, res) => {
  return res.render("list", { users });
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.post("/create", (req, res) => {
  return;
});

app.listen(3000);
