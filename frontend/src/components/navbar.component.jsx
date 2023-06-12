import React from 'react';
import { routes } from '../config';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import Container from 'react-bootstrap/Container';
import { logout } from '../redux/slices/userSlice';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LockFill, Translate } from 'react-bootstrap-icons';
import { addNotification } from '../redux/slices/addNotificationSlice';
import { lang } from '../data/constants';

export default function Navbars() {
  const { t: localize, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { identify } = routes;
  const user = useSelector((state) => state.user);

  const localLogout = (event) => {
    event.preventDefault();

    try {
      unwrapResult(dispatch(logout()));
      history.push(identify);
      dispatch(
        addNotification({
          timeout: 5,
          identifier: 'user',
          icon: <LockFill className='me-2 text-success' />,
          content: 'logout successfully',
        })
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };
  console.log('user', user);

  return (
    <Navbar
      bg='light'
      variant='light'
      fixed='top'
      className='px-4 py-3'
      expand='md'
    >
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          Mini Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {/* {!!user && ( */}
            <Nav.Link onClick={() => history.push('/link')}>
              {localize('Link')}
            </Nav.Link>
            {/* )} */}

            <Nav.Link onClick={() => history.push('/registration')}>
              {localize('Register')}
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              align='end'
              className='d-flex'
              title={
                <>
                  <Translate />
                  language
                </>
              }
              id='basic-nav-dropdown'
            >
              {Object.keys(lang).map((lng) => {
                return (
                  <div
                    type='submit'
                    className='d-flex align-items-start flex-column gap-2'
                    style={
                      i18n.resolvedLanguage === lng
                        ? { backgroundColor: 'light', width: '100%' }
                        : { backgroundColor: 'none', width: '100%' }
                    }
                    key={lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    disabled={i18n.resolvedLanguage === lng}
                  >
                    <NavDropdown.Item
                      variant='primary'
                      active={i18n.resolvedLanguage === lng}
                      className='d-flex align-items-start flex-column gap-2'
                    >
                      {lang[lng].nativeName}
                    </NavDropdown.Item>
                  </div>
                );
              })}
            </NavDropdown>
          </Nav>
          <Nav>
            {!!user ? (
              <Nav.Link variant='' onClick={localLogout}>
                {localize('Logout')}
              </Nav.Link>
            ) : (
              <Nav.Link
                variant=''
                // onClick={() => {
                //   history.push(identify);
                // }}
              >
                {localize('Login')}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
