import React, { useState } from "react";
// import { IntlProvider } from "react-intl";
// import Layout from "./components/Layout/layout";
import Links from "./pages/link.page";
import { Switch, Route } from "react-router-dom";
import homePage from "./pages/home.page";
import NotFoundPage from "./pages/notFound.page";
import Footer from "./components/footer";
import HeadTags from "./components/headerTag";
import Navbars from "./components/navbar";
import Login from "./pages/login.page";
import { Container } from "react-bootstrap";
import Registration from "./pages/registeration";

export default function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
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
            minHeight: "calc(100vh - 4rem)",
          }}
        >
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/registration" component={Registration} />
            <Route path="/link" component={Links} />
            <Route component={NotFoundPage} />
            {/* <Redirect to={configState.organizationUrl || "/"} /> */}
          </Switch>
        </Container>
      </div>
      <Footer />
      {/* </IntlProvider> */}
    </>
  );
}
