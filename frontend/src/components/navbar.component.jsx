import React, { useEffect } from 'react';
import { routes } from '../config';
import { useTranslation } from 'react-i18next';
import { Translate } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LogoutButton } from '../styles/identify.styles';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const lang = {
  en: { nativeName: 'English' },
  dr: { nativeName: 'Dari' },
};
export default function Navbars() {
  const { t: localize, i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const { identify, home } = routes;
  const { user } = useSelector((state) => state.user);
  useEffect(() => {}, [location.pathname]);

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
            <Nav.Link onClick={() => history.push('/link')}>
              {localize('Link')}
            </Nav.Link>
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
              <Nav.Link
                variant=''
                onClick={() => {
                  localStorage.removeItem('token');
                  history.push(home);
                }}
              >
                {localize('Logout')}
              </Nav.Link>
            ) : (
              <Nav.Link
                variant=''
                onClick={() => {
                  history.push(identify);
                }}
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
