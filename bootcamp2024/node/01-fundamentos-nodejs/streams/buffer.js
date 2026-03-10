// O Buffer é uma maneira mais eficiente e performática de escrever e ler da memória de maneira binária, ou seja, sem precisar converter para string, o que pode ser custoso em termos de performance, principalmente quando estamos lidando com grandes volumes de dados, como por exemplo, arquivos, imagens, vídeos, entre outros. O Buffer é uma classe global do Node.js e pode ser utilizada sem a necessidade de importar nenhum módulo.

const buffer = Buffer.from("Hello World");

console.log(buffer); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
console.log(buffer.toJSON()); // { type: 'Buffer', data: [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100 ] }
console.log(buffer.toString()); // Hello World
