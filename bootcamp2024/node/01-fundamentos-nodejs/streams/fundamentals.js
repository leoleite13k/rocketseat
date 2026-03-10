// Streams => Readable, Writable, Duplex, Transform
//  Readable => Lê dos dados em partes (pedaçoes), exemplo: leitura de arquivos, requisições HTTP, etc
//  Writable => Eescreve os dados em partes, exemplo: escrita de arquivos, resposta HTTP, etc
//  Transform => Lê os dados de um lugar e escreve os dados transformados em outro lugar, exemplo: compressão de arquivos, criptografia, etc
//  Duplex => Pode ler e escrever, exemplo: conexões TCP, WebSockets, etc
//  process.stdout
//    .pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
