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

import logo from '../../assets/logo.png';

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
  WrapperForm,
} from './styles';

function Admin() {
  const { signOut, user } = useAuth();
  const formRef = useRef(null);

  const [listServices, setListServices] = useState([]);
  const [textService, setTextService] = useState('');

  const [getServiceTypesFT, setGetServiceTypesFC] = useState();

  useEffect(() => {
    async function getServicesTypes() {
      const { data } = await api.get('service/listServicesType');
      setListServices(data);
    }

    getServicesTypes();
    setGetServiceTypesFC(() => getServicesTypes);
  }, []);

  const handleActiveServiceType = useCallback(async (id, active) => {
    await api.put(`service/activeService/${id}`, {
      active,
    });

    getServiceTypesFT();
  });

  const handleAddNewServiceType = useCallback(async () => {
    if (!textService) return;

    await api.post('service/serviceType', {
      service_type: textService,
    });

    getServiceTypesFT();
    setTextService('');
  }, [textService]);

  const handleAddNewSubService = useCallback(
    async (id) => {
      if (!Object.values(id)[0]) return;

      await api.put(`service/subServices/${Object.keys(id)[0]}`, {
        new_sub_service: [
          {
            id: uuid(),
            sub_services: Object.values(id)[0],
            active: true,
            update_at: new Date(),
            created_at: new Date(),
          },
        ],
      });

      getServiceTypesFT();
    },
    [getServiceTypesFT],
  );

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="logo" />

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
              return (
                <WrapperForm>
                  <Form
                    ref={formRef}
                    key={index}
                    onSubmit={handleAddNewSubService}
                  >
                    <div>
                      <div>
                        <p>{item.service_type}</p>
                        <span
                          onClick={() =>
                            handleActiveServiceType(item.id, item.active)
                          }
                        >
                          {item.active ? 'desativar' : 'ativar'}
                        </span>
                      </div>
                      <h1 style={{ fontSize: 16, margin: '20px 0 10px 0' }}>
                        Sub Serviços
                      </h1>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          {item.sub_service?.map((item) => {
                            const serviceParsed = JSON.parse(item);
                            return (
                              <div
                                style={{ display: 'flex', marginTop: 5 }}
                                key={serviceParsed.id}
                              >
                                <p>{serviceParsed.sub_services}</p>
                                {/* <span
                                // onClick={() => handleSubServices(service.id)}
                                >
                                  {serviceParsed.active
                                    ? 'desativar'
                                    : 'ativar'}
                                </span> */}
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
                </WrapperForm>
              );
            })}
          </Services>
        </TypeOfServices>
      </Content>
    </Container>
  );
}

export default Admin;
