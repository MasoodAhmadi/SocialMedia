import React from "react";
// import nprogress from "nprogress";
// import Router from "next/router";
import HeadTags from "./headerTag";
import { Container } from "react-bootstrap";
import Navbars from "./navbar";
import Footer from "./footer";
export default function Layout({ children }) {
  // Router.onRouterChangeStart = () => nprogress.start();
  // Router.onRouterChangeComplete = () => nprogress.done();
  // Router.onRouterChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      <Navbars />
      <Container style={{ paddingTop: "1rem" }} text>
        {children}
      </Container>
      <Footer />
    </>
  );
}
