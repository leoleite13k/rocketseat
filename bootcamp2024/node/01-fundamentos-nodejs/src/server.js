import http from "node:http";
import { json } from "./middlewares/json.js";

// - Criar usuários
// - Listagem usuários
// - Edição usuários
// - Remoção usuários

// - HTTP Methods: GET, POST, PUT, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Editar um recurso no back-end
// PATCH => Editar um recurso no back-end (atualização parcial)
// DELETE => Remover um recurso no back-end

// API Stateful => O servidor mantém o estado da aplicação, salva na memória as informações
// API Stateless => O servidor não mantém o estado da aplicação, salva as informações em um banco de dados, ou seja, o servidor é "burro" e não tem memória

// Cabeçalhos HTTP => São informações adicionais que o cliente e o servidor podem enviar para se comunicar melhor, como por exemplo, o tipo de conteúdo que está sendo enviado, a autenticação do usuário, entre outros.
// HTTP Status Codes => São códigos numéricos que indicam o resultado de uma requisição HTTP, como por exemplo, 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), entre outros.

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    return res.end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    users.push({ id: 1, name, email });
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("Server running at http://localhost:3333/");
});
