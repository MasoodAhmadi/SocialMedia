import React from 'react';
import { routes } from '../config';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import Container from 'react-bootstrap/Container';
import { logout } from '../redux/slices/userSlice';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, NavDropdown, Dropdown, Button } from 'react-bootstrap';
import { LockFill, Translate } from 'react-bootstrap-icons';
import { addNotification } from '../redux/slices/addNotificationSlice';
import { lang } from '../data/constants';

export default function Navbars() {
  const { t: localize, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { identify } = routes;
  const { user } = useSelector((state) => state.user);

  // const profile_image = user.user.profileImage;
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

  return (
    <>
      <Navbar
        bg='light'
        variant='light'
        fixed='top'
        className='ps-5'
        // expand='md'
      >
        <Navbar.Brand onClick={() => history.push('/')}>Mini Chat</Navbar.Brand>
        <Nav className='ps-4'>
          {/* {!!user && ( */}
          <Nav.Link onClick={() => history.push('/link')}>
            {localize('Link')}
          </Nav.Link>
          {/* )} */}

          <Nav.Link onClick={() => history.push('/registration')}>
            {localize('Register')}
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='pe-2'>
            <NavDropdown
              align='end'
              className='d-flex pe-4'
              title={
                <>
                  language
                  <Translate />
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
          <Nav className='pe-5'>
            <div className='pe-2'>
              <NavDropdown
                align='end'
                id='basic-nav-dropdown'
                className='d-flex justify-content-between'
                // title={user.name}
                title={
                  <>
                    <Button variant='bg-body'>
                      {user?.username}
                      {/* {profile_image && ( */}
                      <img
                        className='rounded-circle article-img'
                        // src={profile_image}
                        width={25}
                        height={25}
                        id='img'
                      />
                      {/* )} */}
                    </Button>
                  </>
                }
                variant='primary'
              >
                {!!user ? (
                  <>
                    <NavDropdown.Item variant='' onClick={localLogout}>
                      {localize('Logout')}
                    </NavDropdown.Item>
                    <Dropdown.Divider />

                    <NavDropdown.Item variant='' onClick={''}>
                      {localize('EditProfile')}
                    </NavDropdown.Item>
                  </>
                ) : (
                  <Nav.Link variant=''>{localize('Login')}</Nav.Link>
                )}
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
