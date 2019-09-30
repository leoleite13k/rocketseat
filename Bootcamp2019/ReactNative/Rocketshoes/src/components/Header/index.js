import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { Container, Logo, Image } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo>
        <Image source={require('~/assets/images/logo.png')} />
      </Logo>
      <Icon name="shoppingcart" size={30} solid color="#fff" />
    </Container>
  );
}
