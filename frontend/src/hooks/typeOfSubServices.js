import React, { createContext, useState } from 'react';

const TypeOfSubServicesContext = createContext([{}, () => {}]);

const TypeOfSubServicesProvider = ({ children }) => {
  const [subServices, setSubServices] = useState([
    {
      title: 'Corte',
      isAvailable: true,
      id: 0,
    },
    {
      title: 'Pintura',
      isAvailable: true,
      id: 1,
    },
  ]);

  return (
    <TypeOfSubServicesContext.Provider value={[subServices, setSubServices]}>
      {children}
    </TypeOfSubServicesContext.Provider>
  );
};

export { TypeOfSubServicesProvider, TypeOfSubServicesContext };
