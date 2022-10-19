import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function WeekofTheDay() {
  return (
    <>
      <Container
        fluid
        style={{
          // display: "flex",
          // alignContent: "center",
          // justifyContent: "center",
          // width: "100%",
          background: "#E8EAEA",
        }}
      >
        <Row>
          <div
            className=""
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            <Col className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#4BABF8",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    MONDAY
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#9F413F",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    TUESDAY
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#B4B1B1 ",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    WEDNESDAY
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </Row>
        <Row
          style={
            {
              // display: "flex",
              // alignContent: "center",
              // justifyContent: "center",
              // margin: "1rem",
            }
          }
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            <Col className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#EBD2AC",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    THURSDAY
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>

                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col className="d-flex justify-content-center">
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#B0CFD0",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    FRIDAY
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="d-flex justify-content-center">
              {" "}
              <Card
                style={{
                  width: "18rem",
                  // margin: "0.5rem",
                  background: "#B0CFD0",
                  borderRadius: "20px 30px 35px 40px",
                }}
              >
                <Card.Body>
                  <Card.Title className="mb-2 d-flex justify-content-center">
                    WEEKEND
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-muted d-flex justify-content-center">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text style={{ background: "white" }}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>

                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}
