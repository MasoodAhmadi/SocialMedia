import React from "react";
import { Card } from "react-bootstrap";

export default function Footer() {
  return (
    <Card className="">
      <Card.Header className="d-flex justify-content-center">
        Featured
      </Card.Header>
      <Card.Body className="d-flex justify-content-center">
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Header className="d-flex justify-content-center">
        Featured
      </Card.Header>
    </Card>
  );
}
/*
   <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")}>
            <Icon size="large" name="sign in" />
            login
          </Menu.Item>
        </Link>
        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            <Icon size="large" name="signup" />
            sign up
          </Menu.Item>
        </Link>
      </Container> *
*/
