import React from "react";
import { IntlProvider } from "react-intl";
// import Layout from "./components/Layout/layout";
import Links from "./pages/link.page";
import { Switch, Route } from "react-router-dom";
import homePage from "./pages/home.page";
import NotFoundPage from "./pages/notFound.page";
import Footer from "./components/Layout/footer";
import HeadTags from "./components/Layout/headerTag";
import Navbars from "./components/Layout/navbar";
import Login from "./pages/login.page";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <>
      <IntlProvider
      // locale={localizationsState.locale}
      // messages={localizationsState.data}
      >
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
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={homePage} />
              <Route path="/link" component={Links} />

              <Route component={NotFoundPage} />
              {/* <Redirect to={configState.organizationUrl || "/"} /> */}
            </Switch>
          </Container>
        </div>
        <Footer />
      </IntlProvider>
    </>
  );
}
