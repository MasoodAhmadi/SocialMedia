import React from "react";
import App from "next/app";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout/layout";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default MyApp;
