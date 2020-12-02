import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28282c;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const WrapperHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Filter = styled.TouchableOpacity``;

export const FilterText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
`;

export const UserAvatar = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProvidersListTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 5px 20px;
  background-color: #fff;
`;

export const Input2 = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;

  flex-direction: row;

  align-items: center;

  color: #232129;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const WrapperInput = styled.View`
  height: 55px;
  padding: 0 10px 0;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;

  align-items: center;

  color: #232129;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const ModalHeaderTitle = styled.Text`
  color: #232129;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
`;
