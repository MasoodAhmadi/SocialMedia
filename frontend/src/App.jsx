import { routes } from './config';
import { themes } from './styles/colors.styles';
import { Links, SignupPage, homePage, Registration } from './pages';
import { Container } from 'react-bootstrap';
import { useWindowSize } from './hooks';
import { ThemeProvider } from 'styled-components';
import React, { useState, Suspense, useEffect } from 'react';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Footer, Loader, Navbars, NotificationManager } from './components';
import './styles/base.scss';
import { loadUsers } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Layout from './pages/layout.page';
import ProtectedRoute from './components/protected-route.component';

function App() {
  const [theme] = useState('defaultTheme');
  const size = useWindowSize();
  const dispatch = useDispatch();
  const location = useLocation();
  const { home, identify, link, signup, registration } = routes;

  useEffect(async () => {
    unwrapResult(await dispatch(loadUsers()));
  }, []);
  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <div>
        {location.pathname !== identify && location.pathname !== signup && (
          <Navbars />
        )}
        <NotificationManager />
        <Switch>
          <ProtectedRoute exact path={link} component={Links} />
          <ProtectedRoute exact path={home} component={homePage} />
          <Route exact path={identify} component={Layout} />
          <ProtectedRoute exact path={registration} component={Registration} />
          <ProtectedRoute exact path={signup} component={SignupPage} />
          <ProtectedRoute component={NotFoundPage} />
        </Switch>
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
