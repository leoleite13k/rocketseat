import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      return res.end(JSON.stringify(database.select("users")));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;
      database.insert("users", { id: randomUUID(), name, email });
      return res.writeHead(201).end();
    },
  },
];
