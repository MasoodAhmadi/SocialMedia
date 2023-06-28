import { routes } from './config';
import { themes } from './styles/colors.styles';
import { Links, SignupPage, homePage, Registration } from './pages';
import { useWindowSize } from './hooks';
import { ThemeProvider } from 'styled-components';
import React, { useState, Suspense, useEffect } from 'react';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Footer, Loader, Navbars, NotificationManager } from './components';
import './styles/base.scss';
import { loadUser } from './redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Layout from './pages/layout.page';
import ProtectedRoute from './components/protected-route.component';

function App() {
  const [theme] = useState('defaultTheme');
  const size = useWindowSize();
  const dispatch = useDispatch();
  const location = useLocation();
  const { home, identify, link, signup, registration } = routes;

  const user = useSelector((state) => state.user);

  console.log('user', user);

  useEffect(async () => {
    unwrapResult(await dispatch(loadUser()));
  }, []);
  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <>
        {location.pathname !== identify && location.pathname !== signup && (
          <Navbars />
        )}
        <NotificationManager />
        <Switch>
          <Route exact path={home} component={homePage} />
          <Route exact path={link} component={Links} />
          <Route exact path={identify} component={Layout} />
          <ProtectedRoute exact path={registration} component={Registration} />
          <ProtectedRoute exact path={signup} component={SignupPage} />
          <ProtectedRoute component={NotFoundPage} />
        </Switch>
      </>
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
