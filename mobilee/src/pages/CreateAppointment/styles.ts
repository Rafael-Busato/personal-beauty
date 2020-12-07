import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from '../Dashboard';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const ServiceLocation = styled.View`
  margin-top: 20px;
`;

export const LabelCheckbox = styled.Text`
  color: #4a4a4a;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
`;

export const WrapperCheckbox = styled.View`
  display: flex;
  flex-direction: row;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom-width: 1;
  border-bottom-color: #000;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28282c;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 23px;
  margin-left: auto;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  padding: 8px 12px;
  align-items: center;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RotoboSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #dd9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerText = styled.Text`
  font-family: 'RotoboSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RotoboSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RotoboSlab-Regular';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 46px;
  background: #dd9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RotoboSlab-Medium';
  font-size: 18px;
  color: #232129;
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 5px 20px;
`;

export const ModalTitle = styled.Text`
  color: #232129;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  line-height: 28px;
`;

export const ModalDescription = styled.Text`
  color: #232129;
  margin-bottom: 20px;
`;

export const Input2 = styled.TextInput`
  width: 100%;
  height: 60px;
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

export const ModalHeader = styled.View`
  padding: 20px;
`;

export const ErrorMessage = styled.Text`
  color: red;
`;

export const ModalContent = styled.View`
  padding: 10px 0;
`;

export const Card = styled.TouchableOpacity`
  border: solid 1px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

export const CardNumber = styled.Text``;
