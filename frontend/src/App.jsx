import React, { useState, useEffect } from 'react';
// import { IntlProvider } from "react-intl";
// import Layout from "./components/Layout/layout";
import Footer from './components/footer';
import Navbars from './components/navbar';
import { ThemeProvider } from 'styled-components';
import { unwrapResult } from '@reduxjs/toolkit';

import { Container } from 'react-bootstrap';
import HeadTags from './components/headerTag';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Links, homePage, Registration } from './pages';
import { SignupPage, NotFoundPage, Identification } from './pages';
import { useDispatch } from 'react-redux';

import './assets/styles/base.scss';
import { routes, themes } from './config';
import { loadUser } from './redux/slices/userSlice';
import { useWindowDimensions } from './hooks';
import ProtectedRoute from './components/protected-route.component';

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
      {/* <IntlProvider
      locale={localizationsState.locale}
      messages={localizationsState.data}
      > */}
      <HeadTags />
      {pathname !== identify && <Navbars />}

      <div>
        <Container
          fluid
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}>
          <Switch>
            <Route exact path={identify} component={Identification} />
            <ProtectedRoute path={home} component={homePage} />
            {/*    <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/registration' component={Registration} /> */}
            <Route path={link} component={Links} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </div>
      <Footer />
      {/* </IntlProvider> */}
			</ThemeProvider>
  );
}
