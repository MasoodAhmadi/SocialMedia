import React from "react";
import { Container } from "semantic-ui-react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import nprogress from "nprogress";
import Router from "next/router";
export default function Layout({ children }) {
  Router.onRouterChangeStart = () => nprogress.start();
  Router.onRouterChangeComplete = () => nprogress.done();
  Router.onRouterChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />

      <Navbar />
      <Container style={{ paddingTop: "1rem" }} text>
        {children}
      </Container>
    </>
  );
}
