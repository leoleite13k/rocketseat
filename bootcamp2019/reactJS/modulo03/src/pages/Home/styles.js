import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductList = styled.ul`
  ${props =>
    props.loading
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            animation: ${rotate} 2s linear infinite;
          }
        `
      : css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
          list-style: none;
        `}

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s; // Tempo que demora para escurecer o background

      &:hover {
        background: ${darken(0.03, '#7159c1')}; //Escurecer o botão
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
