import React from "react";

import { Container } from "react-bootstrap";
export default function Layout({ children }) {
  return (
    <div
      style={{
        background: "black",
        width: "100%",
        // height: "100vh",
      }}
    >
      <Container
        style={{
          paddingTop: "1rem",
          background: "blue",
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
