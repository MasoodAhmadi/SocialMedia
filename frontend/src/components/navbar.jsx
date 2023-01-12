// import { useRouter } from "next/router";
import React from 'react';
//import { useIntl } from "react-intl";
import Container from 'react-bootstrap/Container';
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { LogoutButton } from '../assets/styles/identify.styles';
import {  routes } from '../config';
export default function Navbars() {
  const history = useHistory();
  const { identify } = routes;
  // const isActive = (route) => window.location.pathname === route;

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand
          // active={isActive === "/"}
          onClick={() => history.push('/')}
        >
          <Button variant='none'>Mini Chat</Button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => history.push('/link')}>Link</Nav.Link>
            <Nav.Link onClick={() => history.push('/registration')}>
              Register
            </Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <LogoutButton
              variant=''
              onClick={() => {
                localStorage.removeItem('token');
                history.push(identify);
              }}
            >
              logout
            </LogoutButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
