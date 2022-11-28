import React, { useState } from 'react';
// import { IntlProvider } from "react-intl";
// import Layout from "./components/Layout/layout";
import Footer from './components/footer';
import Navbars from './components/navbar';
import { Container } from 'react-bootstrap';
import HeadTags from './components/headerTag';
import { Switch, Route } from 'react-router-dom';
import { Links, homePage, Registration } from './pages';
import { SignupPage, NotFoundPage, Identification } from './pages';
import './assets/styles/base.scss';

export default function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Identification setToken={setToken} />;
  }

  return (
    <>
      {/* <IntlProvider
      locale={localizationsState.locale}
      messages={localizationsState.data}
      > */}
      <HeadTags />
      <Navbars />
      <div>
        <Container
          fluid
          style={{
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <Switch>
            <Route exact path='/login' component={Identification} />
            <Route path='/' component={homePage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/registration' component={Registration} />
            <Route path='/link' component={Links} />
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </div>
      <Footer />
      {/* </IntlProvider> */}
    </>
  );
}
