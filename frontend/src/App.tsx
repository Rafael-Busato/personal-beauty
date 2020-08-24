import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </Router>
);

export default App;
