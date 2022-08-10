import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import Header from '~/components/Header';

export default function Main() {
  console.tron.log('ok');
  return <Container></Container>;
}

Main.navigationOptions = {
  header: <Header />,
};
