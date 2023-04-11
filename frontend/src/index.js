import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import WrappedApp from './App';
import './i18n';
ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <WrappedApp />
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
