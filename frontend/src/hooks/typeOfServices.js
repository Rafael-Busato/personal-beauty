import React, { createContext, useState } from 'react';

const TypeOfServicesContext = createContext([{}, () => {}]);

const TypeOfServicesProvider = ({ children }) => {
  const [services, setServices] = useState([
    {
      title: 'Manicure',
      isAvailable: true,
      id: '19e8e09c0-d105-470d-a9fc-4343be246066',
    },
    {
      title: 'Cabeleireiro',
      isAvailable: true,
      id: '2e8e09c0-d105-470d-a9fc-4343be246066',
    },
    {
      title: 'Maquiagem',
      isAvailable: true,
      id: '3e8e09c0-d105-470d-a9fc-4343be246066',
    },
    {
      title: 'Barbearia',
      isAvailable: false,
      id: '4e8e09c0-d105-470d-a9fc-4343be246066',
    },
  ]);

  return (
    <TypeOfServicesContext.Provider value={[services, setServices]}>
      {children}
    </TypeOfServicesContext.Provider>
  );
};

export { TypeOfServicesProvider, TypeOfServicesContext };
