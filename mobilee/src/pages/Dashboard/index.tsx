import React, { useCallback, useEffect, useState, useContext } from 'react';
import {
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { RegisterPaymentContext } from '../../hooks/RegisterPaymentContext';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  WrapperHeader,
  Filter,
  FilterText,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
  ModalHeader,
  ModalContainer,
  Input2,
  WrapperInput,
  ModalHeaderTitle,
  List,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providerText, setProviderText] = useState('Prestadores');

  const [getOccupation, setGetOccupation] = useState([]);
  const [listServices, setListServices] = useState([]);

  const [card, setCard] = useContext(RegisterPaymentContext);

  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    async function getListServiceTypes() {
      const response = await api.get('/service/listServicesType');

      const services = response.data.map((item: any) => {
        return item.service_type;
      });

      setGetOccupation(services);
    }

    getListServiceTypes();
  }, []);

  useEffect(() => {
    api.get('providers').then((response) => setProviders(response.data));
  }, []);

  const handleSignOut = () => {
    setCard({ ...card, number: '', validThru: '', name: '', securityCode: '' });
    signOut();
  };

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigation.navigate('CreateAppointment', { providerId });
    },
    [navigation],
  );

  const getProviders = () => {
    setIsLoading(true);

    setModalVisible(false);
    setOccupation('');
    setProviderText(`${occupation} | ${city}`);
    const interval = setInterval(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleSetFilter = useCallback(async () => {
    setModalVisible(false);
    const response = await api.get('/providers/teste', {
      params: {
        service_type: occupation,
        city,
      },
    });

    console.log('response', response.data);

    setProviders(response.data);
  }, [occupation, city]);

  const avatar = 'https://avatars2.githubusercontent.com/u/64861571?s=460&v=4';

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName onPress={handleSignOut}>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: avatar }} />
        </ProfileButton>
      </Header>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#FF9000"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => provider.id}
          ListHeaderComponent={
            <WrapperHeader>
              <ProvidersListTitle>{providerText}</ProvidersListTitle>
              <Filter
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <FilterText>Filtrar</FilterText>
              </Filter>
            </WrapperHeader>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar source={{ uri: avatar }} />
              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>
                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#FF9000" />
                  <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#FF9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      )}

      <Modal animationType="slide" visible={modalVisible}>
        <ModalHeader>
          <ModalHeaderTitle>Filtre por:</ModalHeaderTitle>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Icon name="x-circle" size={25} color="#3e3b47" />
          </TouchableOpacity>
        </ModalHeader>
        <ModalContainer>
          {/* <Input2
            onChangeText={(text) => setCity(text)}
            value={city}
            placeholder="Cidade"
            placeholderTextColor="#232129"
          /> */}
          <WrapperInput>
            <RNPickerSelect
              onValueChange={(text) => setCity(text)}
              placeholder={{
                label: 'Selecione a cidade',
              }}
              style={{
                inputAndroid: { color: '#232129' },
              }}
              items={[
                { label: 'Americana', value: 'americana' },
                { label: 'Campinas', value: 'campinas' },
                { label: 'Cosmópolis', value: 'cosmópolis' },
                { label: 'Holambra', value: 'holambra' },
                { label: 'Hortolândia', value: 'hortolandia' },
                { label: 'Indaiatuba', value: 'indaiatuba' },
                { label: 'Itatiba', value: 'itatiba' },
                { label: 'Jaguariúna', value: 'jaguariúna' },
                { label: 'Monte Mor', value: 'monte mor' },
                { label: 'Morungaba', value: 'morungaba' },
                { label: 'Nova Odessa', value: 'nova odessa' },
                { label: 'Paulínia', value: 'paulínia' },

                { label: 'Sumaré', value: 'sumaré' },
                { label: 'Valinhos', value: 'valinhos' },
                { label: 'Vinhedo', value: 'vinhedo' },
              ]}
            />
          </WrapperInput>
          <WrapperInput>
            <RNPickerSelect
              onValueChange={(text) => setOccupation(text)}
              placeholder={{
                label: 'Selecione o tipo de serviço',
              }}
              style={{
                inputAndroid: { color: '#232129' },
              }}
              items={getOccupation?.map((service) => {
                return {
                  label: service,
                  value: service,
                };
              })}
            />
          </WrapperInput>
          {/* <View>
            <List style={{ display: 'flex', flexDirection: 'column' }}>
              {listServices.map((item) => {
                return (
                  <Text style={{ paddingLeft: 5 }} key={item.id}>
                    {item.service_type}
                  </Text>
                );
              })}
            </List>
          </View> */}
          <TouchableOpacity onPress={handleSetFilter}>
            <Button>Aplicar</Button>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
