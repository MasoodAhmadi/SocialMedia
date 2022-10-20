import React from "react";
import Footer from "./footer";
import Navbars from "./navbar";
import HeadTags from "./headerTag";
import { Container } from "react-bootstrap";
export default function Layout({ children }) {
  return (
    <div style={{ paddingTop: "", background: "black", width: "100%" }}>
      <HeadTags />
      <Navbars />
      <Container
        style={{ paddingTop: "1rem", background: "red", width: "100%" }}
        text
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
}
