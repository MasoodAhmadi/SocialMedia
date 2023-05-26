import { routes } from './config';
import { themes } from './styles/colors.styles';
import { Links, SignupPage, homePage, Registration } from './pages';
import { Container } from 'react-bootstrap';
import { useWindowDimensions } from './hooks';
import { ThemeProvider } from 'styled-components';
import React, { useState, Suspense, useEffect } from 'react';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Footer, Loader, Navbars, NotificationManager } from './components';
import './styles/base.scss';
import { loadUser } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
  const [theme] = useState('defaultTheme');
  const size = useWindowDimensions();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { home, identify, link, signup, registration } = routes;

  useEffect(async () => {
    unwrapResult(await dispatch(loadUser()));
  }, []);

  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <div>
        {pathname !== identify && <Navbars />}

        {/* <Container
        // fluid
        // style={{
        //   minHeight: 'calc(100vh - 11rem)',
        // }}
        > */}
        <NotificationManager />
        <Switch>
          <Route exact path={link} component={Links} />
          <Route exact path={home} component={homePage} />
          <Route exact path={identify} component={Identification} />
          <Route exact path={registration} component={Registration} />
          <Route exact path={signup} component={SignupPage} />
          <Route component={NotFoundPage} />
        </Switch>
        {/* </Container> */}
        {/* <Footer /> */}
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
