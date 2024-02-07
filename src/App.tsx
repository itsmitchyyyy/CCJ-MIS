import { useState } from 'react';

import './App.css';
import { ConfigProvider } from 'antd';
import { token, components } from '@/config/antdTheme';
import { AppProvider } from '@/providers/app';
import Routes from '@/routes';

function App() {
  return (
    <ConfigProvider wave={{ disabled: true }} theme={{ token, components }}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ConfigProvider>
  );
}

export default App;
