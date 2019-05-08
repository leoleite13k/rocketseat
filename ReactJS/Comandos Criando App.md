**Iniciar projeto em ReactJS**

Criar pasta do projeto, ir nela e...

Dependencias: Node e npm

Iniciar o projeto

`npm init -y`

Instalar dependencias do projeto

`npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli`

Configurar o Babel (transpilador)

*Criar arquivo* **.babelrc** , inseir os presets : @babel/preset-env, @babel/preset-react

Configurar o Webpack

*Criar arquivo* **webpack.config.js** , exportar configurações : importa o path. Cria a config entry, output, module e inserir no package.json o script dev para rodar a apicação.

Instalar o reloader automatico

`npm install -D webpack-dev-server`

Inserir  no webpack.config o objeto devServer e alterar o script no package para "dev": "webpack-dev-server --mode development"

Inserir também a seguinte plugin para permitir definição das PropsType dentro da propria classe.

`npm install -D @babel/plugin-proposal-class-properties`

Depois alterar no .babelrc em plugins.


Resumindo
yarn add global react-create-app
yarn add eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D
