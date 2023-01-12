import { routes, themes } from './config';
import { useDispatch } from 'react-redux';
import { Links, homePage } from './pages';
import { Container } from 'react-bootstrap';
import { useWindowDimensions } from './hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { loadUser } from './redux/slices/userSlice';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Footer, Navbars, ProtectedRoute } from './components';
import './assets/styles/base.scss';

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [theme] = useState('defaultTheme');
  const size = useWindowDimensions();
  const { home, identify, link } = routes;

  useEffect(async () => {
    unwrapResult(await dispatch(loadUser()));
  }, []);
  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      {pathname !== identify && <Navbars />}
      <div>
        <Container
          fluid
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <Switch>
            <ProtectedRoute exact path={home} component={homePage} />
            <Route path={identify} component={Identification} />
            <Route path={link} component={Links} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
