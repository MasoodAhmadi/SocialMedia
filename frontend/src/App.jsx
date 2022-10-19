import React from "react";
import { Container, Row } from "react-bootstrap";
import { IntlProvider } from "react-intl";
import Layout from "./components/Layout/layout";
import Links from "./pages/link.page";
import { Switch, Route } from "react-router-dom";
import homePage from "./pages/home.page";

export default function App() {
  return (
    <>
      <IntlProvider
      // locale={localizationsState.locale}
      // messages={localizationsState.data}
      >
        <Layout>
          <div>
            <Container
              fluid
              style={{
                minHeight: "calc(100vh - 4rem)",
              }}
            >
              <Row style={{ paddingTop: "0rem", paddingBottom: "0" }}></Row>
              <main
                style={{
                  paddingBottom: "5rem",
                  paddingTop: "1rem",
                }}
              >
                <Switch>
                  <Route exact path="/" component={homePage} />
                  <Route path="/link" component={Links} />
                  {/* <Routes component={NotFoundPage} /> */}
                  {/* <Redirect to={configState.organizationUrl || "/"} /> */}
                </Switch>
              </main>
            </Container>
          </div>
        </Layout>
      </IntlProvider>
    </>
  );
}
