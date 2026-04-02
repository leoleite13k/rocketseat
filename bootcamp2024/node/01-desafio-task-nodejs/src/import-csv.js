import http from "node:http";
import { Transform } from "node:stream";
import { parse } from "csv-parse";

class ExtractMultipartStream extends Transform {
  constructor(boundary) {
    super();
    this.headerFound = false;
    this.buffer = "";
    this.tail = "";
    this.boundary = boundary;
  }

  _transform(chunk, encoding, callback) {
    if (!this.headerFound) {
      this.buffer += chunk.toString();
      const headerEndIndex = this.buffer.indexOf("\r\n\r\n");

      if (headerEndIndex !== -1) {
        this.headerFound = true;
        const body = this.buffer.slice(headerEndIndex + 4);
        this.buffer = "";
        this.tail = body;
      }

      return callback();
    }

    this.push(this.tail);
    this.tail = chunk.toString();
    callback();
  }

  _flush(callback) {
    const boundaryIndex = this.tail.indexOf(`\r\n--${this.boundary}--`);
    if (boundaryIndex !== -1) {
      this.push(this.tail.slice(0, boundaryIndex));
    } else {
      this.push(this.tail);
    }
    callback();
  }
}

const server = http.createServer(async (req, res) => {
  const contentType = req.headers["content-type"];
  const boundaryMatch = contentType.match(/boundary=(.+)$/);

  if (!boundaryMatch) {
    res.writeHead(400);
    res.end("Missing boundary");
    return;
  }

  const boundary = boundaryMatch[1];
  const multipartStream = new ExtractMultipartStream(boundary);
  const parser = req
    .pipe(multipartStream)
    .pipe(parse({ delimiter: ",", columns: true }));

  for await (const record of parser) {
    http
      .request("http://localhost:3333/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      .on("error", (err) => {
        console.error("Error to import tasks:", err);
      })
      .end(JSON.stringify(record));
  }

  res.writeHead(200);
  res.end("Tasks imported successfully");
});

server.listen(3334);
