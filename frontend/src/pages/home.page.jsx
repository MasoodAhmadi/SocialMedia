import React from "react";
import { Row, Container, ListGroup } from "react-bootstrap";
import Example from "../components/coursal";
import WeekofTheDay from "../components/week";

export default function homePage() {
  return (
    <div>
      <>
        <Row>
          <div
            style={{
              width: "100%",
              // position: "relative",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Example />
          </div>
        </Row>
        <Row>
          <div
            style={{
              width: "100%",
              // position: "relative",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <WeekofTheDay />
          </div>
        </Row>
      </>
    </div>
  );
}
