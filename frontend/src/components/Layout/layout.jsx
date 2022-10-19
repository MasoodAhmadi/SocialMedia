import React from "react";
import Footer from "./footer";
import Navbars from "./navbar";
import HeadTags from "./headerTag";
import { Container } from "react-bootstrap";
export default function Layout({ children }) {
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
