const path = require("path");

module.exports = {
  // Arquivo inicial
  entry: path.resolve(__dirname, "src", "index.js"),
  // A onde vai ser criado o bundle
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  // Instalar servidor de desenvolvimento (Recarregar automatico)
  devServer: {
    contentBase: path.resolve(__dirname, "public")
  },
  // Regras para o modulo, testa arquivos .js e retira o node_modules, instala babel-loader
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};
