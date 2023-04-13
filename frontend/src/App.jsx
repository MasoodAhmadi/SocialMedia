import { routes } from './config';
import { themes } from './styles/colors.styles';
import { Links, homePage } from './pages';
import { Container } from 'react-bootstrap';
import { useWindowDimensions } from './hooks';
import { ThemeProvider } from 'styled-components';
import React, { useState, Suspense, useEffect } from 'react';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  Loader,
  Navbars,
  NotificationManager,
  ProtectedRoute,
} from './components';
import './styles/base.scss';
import { loadUser } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
  const [theme] = useState('defaultTheme');
  const size = useWindowDimensions();
  const dispatch = useDispatch();
  const { home, identify, link } = routes;

  useEffect(async () => {
    unwrapResult(await dispatch(loadUser()));
  }, []);

  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <div>
        {/* {pathname !== identify &&
				 } */}
        <Navbars />

        <Container
          fluid
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <NotificationManager />
          <Switch>
            <Route exact path={link} component={Links} />
            <Route exact path={home} component={homePage} />
            <Route exact path={identify} component={Identification} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  );
}
