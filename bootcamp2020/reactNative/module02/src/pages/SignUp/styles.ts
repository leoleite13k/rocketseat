import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0px 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0px ${16 + getBottomSpace()}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSignInText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  font-size: 18px;
  margin-left: 16px;
`;
