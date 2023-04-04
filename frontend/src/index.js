import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './i18n';
ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      {/* <React.Suspense fallback='loading'> */}
      <App />
      {/* </React.Suspense> */}
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
