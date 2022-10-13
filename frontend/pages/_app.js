import React from "react";
// import App from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

import Layout from "../components/layout/layout";

export default function MyApp(props) {
  const localizationsState = useSelector((state) => state.localizations);
  const { Component } = props;

  return (
    <IntlProvider
    // locale={localizationsState.locale}
    // messages={localizationsState.data}
    >
      <Layout>
        <Component />
      </Layout>
    </IntlProvider>
  );
}
