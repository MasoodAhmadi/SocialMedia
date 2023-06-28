import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import WrappedApp from './App';
import './i18n';
import { HashRouter } from 'react-router-dom';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
ReactDOM.render(
  <HashRouter>
    <ReduxProvider store={store}>
      <WrappedApp />
    </ReduxProvider>
  </HashRouter>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
