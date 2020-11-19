import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { TypeOfServicesProvider } from './typeOfServices';
import { TypeOfSubServicesProvider } from './typeOfSubServices';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <TypeOfServicesProvider>
        <TypeOfSubServicesProvider>{children}</TypeOfSubServicesProvider>
      </TypeOfServicesProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
