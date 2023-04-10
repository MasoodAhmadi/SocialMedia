import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// is comcone
export default function NotFoundPage() {
  const history = useHistory();
  return (
    <div
      className="d-flex justify-items-center"
      style={{ height: "100vh", display: "" }}
    >
      <Container>
        {" "}
        <Row>
          <Col className="d-flex justify-items-center gap-3">
            <p>redirect to home page! </p>
            <Button variant="light" onClick={() => history.push("/")}>
              Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
