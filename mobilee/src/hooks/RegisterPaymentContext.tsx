import React, { createContext, useState } from 'react';

const RegisterPaymentContext = createContext([{}, () => {}]);

const RegisterPaymentProvider = ({ children }) => {
  const [card, setCard] = useState({
    number: '',
    validThru: '',
    name: '',
    securityCode: '',
  });

  return (
    <RegisterPaymentContext.Provider value={[card, setCard]}>
      {children}
    </RegisterPaymentContext.Provider>
  );
};

export { RegisterPaymentProvider, RegisterPaymentContext };
