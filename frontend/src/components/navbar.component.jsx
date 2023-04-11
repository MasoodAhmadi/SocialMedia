import React from 'react';
import { routes } from '../config';
import { useTranslation } from 'react-i18next';
import { Translate } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { LogoutButton } from '../styles/identify.styles';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const lang = {
  en: { nativeName: 'English' },
  dr: { nativeName: 'Dari' },
};
export default function Navbars() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { identify } = routes;

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          Mini Cha
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => history.push('/link')}>Link</Nav.Link>
            <Nav.Link onClick={() => history.push('/registration')}>
              {t('Register')}
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
