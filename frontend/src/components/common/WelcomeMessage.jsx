import React, { useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const HeaderMessage = () => {
  const location = useLocation();
  const signupRoute = location.pathname === '/identify';
  const { t: localize } = useTranslation();
  return (
    <Alert color='teal'>
      <div>
        <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
          {signupRoute
            ? `${localize('Started')}`
            : `${localize('WelcomeBack')}`}
        </Alert.Heading>
      </div>
      <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
        {location.pathname !== '/identify'
          ? `${localize('CreateNewAccount')}`
          : `${localize('LoginWithEmail')}`}
      </Alert.Heading>
    </Alert>
  );
};

export const FooterMessage = ({ changeAuthMode, authMode }) => {
  const { t: localize } = useTranslation();

  return (
    <>
      <Alert color='teal'>
        <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
          {authMode !== '/identify' ? (
            <div>
              {localize('NewUser')} ?
              <Badge
                bg='light'
                text='dark'
                style={{ cursor: 'pointer' }}
                onClick={changeAuthMode}
              >
                {localize('SignupHere')}
              </Badge>
              {localize('Instead')}
            </div>
          ) : (
            <p>
              {localize('ExistingUser')} ?
              {
                <Badge
                  bg='light'
                  text='dark'
                  style={{ cursor: 'pointer' }}
                  onClick={changeAuthMode}
                >
                  {localize('LoginHereInstead')}
                </Badge>
              }
            </p>
          )}
        </Alert.Heading>
      </Alert>
    </>
  );
};
