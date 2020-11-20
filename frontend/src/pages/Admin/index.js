import React, { useCallback, useContext, useState, useEffect } from 'react';

import { uuid } from 'uuidv4';

import { Link } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

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
import { date } from 'yup';

function Admin() {
  const { signOut, user } = useAuth();

  const [listServices, setListServices] = useState([]);
  const [listSubServices, setListSubServices] = useState([]);

  const [services, setServices] = useContext(TypeOfServicesContext);
  const [subServices, setSubServices] = useContext(TypeOfSubServicesContext);

  const [textService, setTextService] = useState('');
  const [textSubService, setTextSubService] = useState('');

  useEffect(() => {
    async function getServicesTypes() {
      const { data } = await api.get('service/listServicesType');
      console.log('DATA', data);
      setListServices(data);
      setListSubServices(data);
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

  const handleAddNewSubService = useCallback(async (id) => {
    const { data } = await api.get(`service/specificSubService/${id}`);

    const newSub = [
      data.sub_servicer,
      {
        id: uuid(),
        sub_services: textSubService,
        active: true,
        update_at: new Date(),
        created_at: new Date(),
      },
    ];
    // console.log('NEW SUB', newSub);
    return;
    const response = await api.put(`service/subServices/${id}`, {
      new_sub_service: newSub,
    });

    let newSubService = JSON.parse(response.data.sub_service[0]);

    setListSubServices([listSubServices, newSubService.sub_services]);
  }, []);

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
            {listServices.map((item) => (
              <>
                <div key={item.id}>
                  <p>{item.service_type}</p>
                  <span onClick={() => handleServices(item)}>
                    {item.active ? 'desativar' : 'ativar'}
                  </span>
                </div>

                {/* Titulo do serviço */}

                <h1 style={{ fontSize: 16, margin: '20px 0 10px 0' }}>
                  Sub Serviços
                </h1>

                {/* Titulo do serviço */}

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* CONTAINER DA LISTA DO SUB SERVIÇO  */}

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {handleMapSubService(item)}
                  </div>

                  {/* CONTAINER DA LISTA DO SUB SERVIÇO  */}

                  {/* BOTÃO E INPUT PARA ADICIONAR NOVO SUB-SERVIÇO */}
                  <div style={{ marginTop: 12 }}>
                    <input
                      value={textSubService}
                      onChange={(event) =>
                        setTextSubService(event.target.value)
                      }
                    />
                    <button
                      style={{
                        marginLeft: 0,
                        marginTop: 10,
                        width: 150,
                        height: 45,
                      }}
                      onClick={() => handleAddNewSubService(item.id)}
                    >
                      Adicionar
                    </button>
                  </div>
                  {/* BOTÃO PARA ADICIONAR NOVO SUB-SERVIÇO */}
                </div>
              </>
            ))}
          </Services>
        </TypeOfServices>
      </Content>
    </Container>
  );
}

export default Admin;
