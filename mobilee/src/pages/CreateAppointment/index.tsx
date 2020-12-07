import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import CheckBoxComponent from '../../components/CheckBox';
import {
  Platform,
  Alert,
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  Input2,
  ErrorMessage,
  ModalContent,
  Card,
  CardNumber,
  ServiceLocation,
  LabelCheckbox,
  WrapperCheckbox,
} from './styles';
import Button from '../../components/Button';
import { RegisterPaymentContext } from '../../hooks/RegisterPaymentContext';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Provider } from '../Dashboard';
import formatDate from '../../utils/formatDate';
import { zhCN } from 'date-fns/locale';

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [card, setCard] = useContext(RegisterPaymentContext);

  const routeParams = route.params as RouteParams;

  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  const [serviceLocation, setServiceLocation] = useState({});
  const [needServiceLocation, setNeedServiceLocation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDateTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const [selectedClient, setSelectedClient] = useState(null);
  const [services, setServices] = useState([]);

  const [selectedSubService, setSelectedSubService] = useState({});

  const [selectedItems, setSelectedItems] = useState([]);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    api.get('providers').then((response) => setProviders(response.data));
  }, []);

  useEffect(() => {
    if (providers.length) {
      const client = providers.find((item) => {
        return item.id === selectedProvider;
      });

      setSelectedClient(client);
    }
  }, [selectedProvider, providers]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectCard = () => {
    setCard({
      ...card,
      number: '10',
      validThru: '20',
      name: 'Rafael',
      securityCode: '123',
    });
    setModalPaymentVisible(false);
  };

  const handleSaveCard = async () => {
    // navigation.goBack();

    if (!card.number || !card.validThru || !card.name || !card.securityCode) {
      setErrorMessage('É necessário preencher todos os dados do cartão');

      return;
    }

    setModalPaymentVisible(false);

    // try {
    //   const date = new Date(selectedDate);

    //   date.setHours(selectedHour);
    //   date.setMinutes(0);

    //   await api.post('/appointments', {
    //     provider_id: selectedProvider,
    //     date,
    //   });

    //   navigation.navigate('AppointmentCreated', { date: date.getTime() });
    // } catch (error) {
    //   console.log('error', error);
    //   Alert.alert(
    //     'Erro ao criar agendamento',
    //     'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
    //   );
    // }
  };

  const handleSaveLocation = () => {
    setNeedServiceLocation(false);
  };

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDateTimePicker((state) => !state);
  }, []);

  const handleChangeSubService = (item) => {
    const value = item.service;
    const index = selectedItems.findIndex((x) => x.service === value);
    if (index > -1) {
      setSelectedItems = [
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ];
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    console.log('selectedItems', selectedItems);
  }, [selectedItems]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDateTimePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
        setSelectedHour(0);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    if (!card.number || !card.validThru || !card.name || !card.securityCode) {
      setModalPaymentVisible(true);
      return;
    }

    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
        selectedSubService,
      });

      navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Erro ao criar agendamente',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
      );
    }
  }, [navigation, selectedDate, selectedHour, selectedProvider]);

  const createAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Erro ao criar agendamente',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
      );
    }
  }, [navigation, selectedDate, selectedHour, selectedProvider]);

  const avatar = 'https://avatars2.githubusercontent.com/u/64861571?s=460&v=4';

  useEffect(() => {
    if (selectedClient) {
      const subServices = selectedClient.sub_service;
      const x = subServices.map((item) => {
        return JSON.parse(item);
      });

      setServices(x);
    }
  }, [selectedClient]);

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
            <HeaderTitle>Prestadores</HeaderTitle>
          </BackButton>

          <UserAvatar source={{ uri: avatar }} />
        </Header>

        <Content>
          <ProvidersListContainer>
            <ProvidersList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={providers}
              keyExtractor={(provider) => provider.id}
              renderItem={({ item: provider }) => (
                <ProviderContainer
                  selected={provider.id === selectedProvider}
                  onPress={() => handleSelectProvider(provider.id)}
                >
                  <ProviderAvatar source={{ uri: avatar }} />
                  <ProviderName selected={provider.id === selectedProvider}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              )}
            />
          </ProvidersListContainer>

          <Calendar>
            <Title>Escolha a data</Title>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerText>
                Selecionar outra data | data atual: {selectedDate.getDate()}/
                {selectedDate.getMonth() + 1}
              </OpenDatePickerText>
            </OpenDatePickerButton>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                onChange={handleDateChanged}
                display="calendar"
                textColor="#f4ede8"
                value={selectedDate}
              />
            )}
          </Calendar>

          <ServiceLocation>
            <Title>Escolha o local de atendimento</Title>

            <CreateAppointmentButton
              onPress={() => setNeedServiceLocation(true)}
            >
              <CreateAppointmentButtonText>
                Definir o local de atendimento
              </CreateAppointmentButtonText>
            </CreateAppointmentButton>
          </ServiceLocation>

          <ServiceLocation>
            <Title>Defina o método de pagamento</Title>

            <CreateAppointmentButton
              onPress={() => setModalPaymentVisible(true)}
            >
              <CreateAppointmentButtonText>
                Defina o metódo de pagamento
              </CreateAppointmentButtonText>
            </CreateAppointmentButton>
          </ServiceLocation>

          <Schedule>
            <Title>Escolha o horário</Title>

            <Section>
              <SectionTitle>Manhã</SectionTitle>

              <SectionContent>
                {morningAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      enabled={available}
                      available={available}
                      key={hourFormatted}
                      selected={selectedHour === hour}
                      onPress={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>Tarde</SectionTitle>

              <SectionContent>
                {afternoonAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <Hour
                      enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onPress={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>

          <Section>
            <Title>Escolha o serviço</Title>

            <SectionContent>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {services.map((item, index) => {
                  return (
                    <View key={index}>
                      <LabelCheckbox>{item.service}</LabelCheckbox>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <CheckBox
                          value={selectedItems[item.service]}
                          onValueChange={() => handleChangeSubService(item)}
                        />
                        <Text style={{ color: '#FFF', marginLeft: 15 }}>
                          R$ {item.price}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </SectionContent>
          </Section>

          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>
              Realizar agendamento
            </CreateAppointmentButtonText>
          </CreateAppointmentButton>

          {/* {serviceLocation.city && card.city && (
            <CreateAppointmentButton onPress={createAppointment}>
              <CreateAppointmentButtonText>
                Realizar agendamento
              </CreateAppointmentButtonText>
            </CreateAppointmentButton>
          )} */}
        </Content>
      </Container>
      <Modal animationType="slide" visible={modalPaymentVisible}>
        <ModalHeader>
          <ModalTitle>Pagamento</ModalTitle>
          <ModalDescription>Adicione seu cartão de crédito</ModalDescription>
        </ModalHeader>
        <ModalContainer>
          <Input2
            onChangeText={(text) => setCard({ ...card, number: text })}
            value={card.number}
            placeholder="Número"
            placeholderTextColor="#232129"
          />
          <Input2
            onChangeText={(text) =>
              setCard({ ...card, validThru: formatDate(text) })
            }
            value={card.validThru}
            placeholder="Válidade do cartão"
            placeholderTextColor="#232129"
          />
          <Input2
            onChangeText={(text) => setCard({ ...card, securityCode: text })}
            value={card.securityCode}
            placeholder="Código de segurança"
            maxLength={3}
            placeholderTextColor="#232129"
          />
          <Input2
            onChangeText={(text) => setCard({ ...card, name: text })}
            value={card.name}
            placeholder="Nome Completo"
            placeholderTextColor="#232129"
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>

          <TouchableOpacity onPress={handleSaveCard}>
            <Button>Adicionar cartão</Button>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>

      <Modal animationType="slide" visible={needServiceLocation}>
        <ModalHeader>
          <ModalTitle>Defina o local de atendimento</ModalTitle>
        </ModalHeader>
        <ModalContainer>
          <WrapperCheckbox>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <LabelCheckbox>Minha residência</LabelCheckbox>
          </WrapperCheckbox>

          <Input2
            onChangeText={(text) =>
              setServiceLocation({ ...serviceLocation, city: text })
            }
            value={serviceLocation.city}
            placeholder="Cidade"
            placeholderTextColor="#232129"
          />
          <Input2
            onChangeText={(text) =>
              setServiceLocation({ ...serviceLocation, cep: text })
            }
            value={serviceLocation.cep}
            placeholder="CEP"
            placeholderTextColor="#232129"
          />
          <Input2
            onChangeText={(text) =>
              setServiceLocation({ ...serviceLocation, neighborhood: text })
            }
            value={serviceLocation.neighborhood}
            placeholder="Rua"
            placeholderTextColor="#232129"
          />
          {/* <Input2
            onChangeText={(text) =>
              setServiceLocation({ ...serviceLocation, number: text })
            }
            value={serviceLocation.number}
            placeholder="Número"
            placeholderTextColor="#232129"
          /> */}
          <TouchableOpacity onPress={handleSaveLocation}>
            <Button>Salvar Local de Atendimento</Button>
          </TouchableOpacity>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default CreateAppointment;
