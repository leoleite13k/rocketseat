import fs from "fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(key) {
    return this.#database[key] ?? [];
  }

  insert(key, value) {
    if (Array.isArray(this.#database[key])) {
      this.#database[key].push(value);
    } else {
      this.#database[key] = [value];
    }

    this.#persist();
  }
}
