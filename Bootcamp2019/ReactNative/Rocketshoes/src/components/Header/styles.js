import styled from 'styled-components/native';

export const Container = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #141419;
`;

export const Logo = styled.View`
  width: 150px;
  height: 40px;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
`;
