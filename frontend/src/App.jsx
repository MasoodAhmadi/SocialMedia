import { routes } from './config';
import { themes } from './styles/colors.styles';
import { Links, homePage } from './pages';
import { Container } from 'react-bootstrap';
import { useWindowDimensions } from './hooks';
import { ThemeProvider } from 'styled-components';
import React, { useState, Suspense } from 'react';
import { NotFoundPage, Identification } from './pages';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Loader, Navbars, ProtectedRoute } from './components';
import './styles/base.scss';

function App() {
  const { pathname } = useLocation();
  const [theme] = useState('defaultTheme');
  const size = useWindowDimensions();
  const { home, identify, link } = routes;

  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <div>
        {/* {
				pathname !== identify &&
			} */}
        <Navbars />
        <Container
          fluid
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <Switch>
            <ProtectedRoute exact path={home} component={homePage} />
            <Route exact path={identify} component={Identification} />
            <Route exact path={link} component={Links} />
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
