// import { Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
// import Link from "next/link";
import React from "react";
//import { useIntl } from "react-intl";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Navbars() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          // name="Home"
          // active={isActive === "home"}
          onClick={() => router.push("/home")}
        >
          sss
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {/* <Menu.Item
          name="messages"
          // active={activeItem === "messages"}
          // onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Dropdown item text="Language">
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Finnish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button primary onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu> */}
      </Container>
    </Navbar>
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
