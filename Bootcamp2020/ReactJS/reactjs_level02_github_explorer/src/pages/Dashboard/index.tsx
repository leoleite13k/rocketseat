import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';

import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Logo GitHub Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form action="">
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisa</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/30642674?s=460&u=9c493b18b889def7a4b7f85b163ff5df47a7b6fe&v=4"
            alt="Leonardo Leite"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy higly scalable ReactJS and React Native Forms</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/30642674?s=460&u=9c493b18b889def7a4b7f85b163ff5df47a7b6fe&v=4"
            alt="Leonardo Leite"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy higly scalable ReactJS and React Native Forms</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/30642674?s=460&u=9c493b18b889def7a4b7f85b163ff5df47a7b6fe&v=4"
            alt="Leonardo Leite"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy higly scalable ReactJS and React Native Forms</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
