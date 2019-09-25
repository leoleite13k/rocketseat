import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import SvgUri from 'react-native-svg-uri';

import { Container, Logo } from './styles';

export default function Header() {
  return (
    <Container>
      <Logo>
        <SvgUri source={require('~/assets/images/logo.svg')} />
      </Logo>
      <Icon name="shoppingcart" size={30} solid color="#fff" />
    </Container>
  );
}
