import React from "react";
import { Container } from "react-bootstrap";
import { IntlProvider } from "react-intl";
import Layout from "./components/Layout/layout";
import Links from "./pages/link.page";
import { Switch, Route } from "react-router-dom";
import homePage from "./pages/home.page";
import NotFoundPage from "./pages/notFound.page";
import Footer from "./components/Layout/footer";
import HeadTags from "./components/Layout/headerTag";
import Navbars from "./components/Layout/navbar";

export default function App() {
  return (
    <>
      <div>
        <IntlProvider
        // locale={localizationsState.locale}
        // messages={localizationsState.data}
        >
          <HeadTags />
          <Navbars />
          <Layout>
            <main
            // style={{
            //   paddingBottom: "2rem",
            //   paddingTop: "1rem",
            // }}
            >
              <Switch>
                <Route exact path="/" component={homePage} />
                <Route path="/link" component={Links} />

                <Route component={NotFoundPage} />
                {/* <Redirect to={configState.organizationUrl || "/"} /> */}
              </Switch>
            </main>
          </Layout>
          <Footer />
        </IntlProvider>
      </div>
    </>
  );
}
