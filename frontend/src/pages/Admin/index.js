import React, { useCallback, useContext, useState } from 'react';

import { uuid } from 'uuidv4';

import { Link } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

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

  const [services, setServices] = useContext(TypeOfServicesContext);
  const [subServices, setSubServices] = useContext(TypeOfSubServicesContext);
  const [textService, setTextService] = useState('');
  const [textSubService, setTextSubService] = useState('');
  const [text, setText] = useState('');

  const createService = (event) => {
    event.preventDefault();

    if (!textService) return;
    console.log('chegou aqui 3');

    const data = {
      id: uuid(),
      title: textService,
      isAvailable: true,
    };

    setServices([...services, data]);
    console.log('setServices', services);
    setTextService('');
  };

  const createSubService = (event) => {
    event.preventDefault();

    if (!textSubService) return;
    console.log('chegou aqui 3');

    const data = {
      id: uuid(),
      title: textSubService,
      isAvailable: true,
    };

    setSubServices([...subServices, data]);
    console.log('setSubServices', subServices);
    setTextSubService('');
  };

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
            <button onClick={createService}>Adicionar</button>
          </WrapperInput>

          <Services>
            {services.map((item, index) => (
              <div key={index}>
                <p>{item.title}</p>
                {item.isAvailable ? (
                  <span onClick={() => handleServices(item)}>desativar</span>
                ) : (
                  <span onClick={() => handleServices(item)}>ativar</span>
                )}
              </div>
            ))}
          </Services>
        </TypeOfServices>
        <TypeOfServices>
          <h1>Sub serviços</h1>
          <WrapperInput>
            <input
              value={textSubService}
              onChange={(event) => setTextSubService(event.target.value)}
            />
            <button onClick={createSubService}>Adicionar</button>
          </WrapperInput>

          <Services>
            {subServices.map((item, index) => (
              <div key={index}>
                <p>{item.title}</p>
                {item.isAvailable ? (
                  <span onClick={() => handleSubServices(item)}>desativar</span>
                ) : (
                  <span onClick={() => handleSubServices(item)}>ativar</span>
                )}
              </div>
            ))}
          </Services>
        </TypeOfServices>
      </Content>
    </Container>
  );
}

export default Admin;
