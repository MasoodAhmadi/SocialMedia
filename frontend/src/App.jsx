// import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout/layout";
import homePage from "./pages/home.page";

export default function App() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const configState = useSelector((state) => state.config);
  // const localizationsState = useSelector((state) => state.localizations);
  // const history = useHistory();

  // const isRootPage = location.pathname === "/";

  // useEffect(() => {
  //   if (!isRootPage) {
  //     dispatch(loadTags());
  //     dispatch(loadDegrees());
  //     dispatch(loadTypes());
  //     loadUser();
  //   }

  //   const unListenHistory = history.listen((location) => {
  //     if (
  //       localStorage.getItem("access-token") &&
  //       location.pathname.includes("/admin")
  //     ) {
  //       unwrapResult(dispatch(getUserInfo()));
  //     }
  //   });

  //   return () => {
  //     unListenHistory();
  //   };
  // }, []);

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
                  {/* <Route component={NotFoundPage} /> */}
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
