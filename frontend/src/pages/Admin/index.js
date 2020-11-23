import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { uuid } from 'uuidv4';

import { Form } from '@unform/web';

import { Link } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

import api from '../../services/api';

import { TypeOfServicesContext } from '../../hooks/typeOfServices';
import { TypeOfSubServicesContext } from '../../hooks/typeOfSubServices';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  TypeOfServices,
  WrapperInput,
  Services,
} from './styles';

function Admin() {
  const { signOut, user } = useAuth();

  const formRef = useRef(null);

  const [listServices, setListServices] = useState([]);
  const [listSubServices, setListSubServices] = useState([]);

  const [services, setServices] = useContext(TypeOfServicesContext);
  const [subServices, setSubServices] = useContext(TypeOfSubServicesContext);

  const [textService, setTextService] = useState('');
  const [textSubService, setTextSubService] = useState('');

  useEffect(() => {
    async function getServicesTypes() {
      const { data } = await api.get('service/listServicesType');
      setListServices(data);
      // setListSubServices(data);
    }

    getServicesTypes();
  }, []);

  // useEffect(() => {
  //   async function getSubServices() {
  //     const { data } = await api.get(
  //       `service/specificSubService/${'f053b64b-378e-4be2-8c72-4b9da6c32277'}`,
  //     );

  //     console.log('data', data);
  //     setListSubServices(data);
  //   }
  //   getSubServices();
  // }, []);

  const handleAddNewServiceType = useCallback(async () => {
    if (!textService) return;

    const response = await api.post('service/serviceType', {
      service_type: textService,
    });

    const data = {
      id: uuid(),
      service_type: response.data.service_type,
      active: response.data.active,
    };

    setListServices([...listServices, data]);
    setTextService('');
  }, [services, setServices, textService]);

  const handleAddNewSubService = useCallback(
    async (id) => {
      const { data: response } = await api.get(
        `service/specificSubService/3036428f-322e-4fe6-aaa8-4063d45c4304`,
      );

      const newSub = [
        ...response.sub_service,
        {
          id: uuid(),
          sub_services: Object.values(id)[0],
          active: true,
          update_at: new Date(),
          created_at: new Date(),
        },
      ];
      const responseApi = await api.put(
        `service/subServices/${Object.keys(id)[0]}`,
        {
          new_sub_service: newSub,
        },
      );

      console.log('resposta', responseApi);

      // let newSubService = JSON.parse(response.data.sub_service[0]);

      // setListSubServices([listSubServices, newSubService.sub_services]);
    },
    [textSubService],
  );

  const handleServices = useCallback((item) => {
    const a = services.findIndex((element) => element.id === item.id);

    services[a].isAvailable = !item.isAvailable;
    setServices([...services]);
  }, []);

  const handleSubServices = useCallback((item) => {
    const a = subServices.findIndex((element) => element.id === item.id);

    subServices[a].isAvailable = !item.isAvailable;
    setSubServices([...subServices]);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  function handleMapSubService(item) {
    // const servicesParsed = JSON.parse(item.sub_service.sub_services);
    // servicesParsed.map((service) => {
    //   return (
    //     <div style={{ display: 'flex', marginTop: 5 }} key={service.id}>
    //       <p>{service}</p>
    //       <span onClick={() => handleSubServices(service.id)}>
    //         {service.active ? 'desativar' : 'ativar'}
    //       </span>
    //     </div>
    //   );
    // });
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <h1>Logo</h1>

          <Profile>
            <img
              src="https://avatars2.githubusercontent.com/u/64861571?s=460&v=4"
              alt={user.name}
            />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={handleSignOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <TypeOfServices>
          <h1>Tipos de serviço</h1>
          <WrapperInput>
            <input
              value={textService}
              onChange={(event) => setTextService(event.target.value)}
            />
            <button onClick={handleAddNewServiceType}>Adicionar</button>
          </WrapperInput>

          <Services>
            {listServices.map((item, index) => {
              console.log('item', item);
              return (
                <Form
                  ref={formRef}
                  key={index}
                  onSubmit={handleAddNewSubService}
                >
                  <div>
                    <div>
                      <p>{item.service_type}</p>
                      <span onClick={() => handleServices(item)}>
                        {item.active ? 'desativar' : 'ativar'}
                      </span>
                    </div>
                    <h1 style={{ fontSize: 16, margin: '20px 0 10px 0' }}>
                      Sub Serviços
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {item.sub_service.map((item) => {
                          console.log('sub service item MAP', JSON.parse(item));

                          const teste = JSON.parse(item);
                          return (
                            <div
                              style={{ display: 'flex', marginTop: 5 }}
                              key={teste.id}
                            >
                              <p>{teste.sub_services}</p>
                              <span
                              // onClick={() => handleSubServices(service.id)}
                              >
                                {teste.active ? 'desativar' : 'ativar'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <Input name={(item.service_type, item.id)} />
                        <button
                          style={{
                            marginLeft: 0,
                            marginTop: 10,
                            width: 150,
                            height: 45,
                          }}
                          type="submit"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            })}
          </Services>
        </TypeOfServices>
      </Content>
    </Container>
  );
}

export default Admin;
