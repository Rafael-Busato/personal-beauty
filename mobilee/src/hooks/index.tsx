import React from 'react';

import { AuthProvider } from './auth';
import { RegisterPaymentProvider } from './RegisterPaymentContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <RegisterPaymentProvider>{children}</RegisterPaymentProvider>
  </AuthProvider>
);

export default AppProvider;
