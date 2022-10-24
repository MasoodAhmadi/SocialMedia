import React from "react";

import { Container } from "react-bootstrap";
export default function Layout({ children }) {
  return (
    <div
      style={{
        background: "gray",
        width: "100%",
        // height: "100vh",
      }}
    >
      <Container
        style={{
          paddingTop: "1rem",
          background: "black",
          width: "100%",
          // height: "100vh",
        }}
        text
      >
        {children}
      </Container>
    </div>
  );
}
