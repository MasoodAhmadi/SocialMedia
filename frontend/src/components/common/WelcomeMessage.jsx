import React from 'react';
import { Alert, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

export const HeaderMessage = () => {
  const location = useLocation();
  const signupRoute = location.pathname === '/identify';
  const { t: localize } = useTranslation();
  return (
    <Alert color='teal'>
      <div>
        <Alert.Heading style={{ fontSize: '1rem' }}>
          {signupRoute
            ? `${localize('Started')}`
            : `${localize('WelcomeBack')}`}
        </Alert.Heading>
      </div>
      <Alert.Heading style={{ fontSize: '1rem' }}>
        {signupRoute
          ? `${localize('LoginWithEmail')}`
          : `${localize('CreateNewAccount')}`}
      </Alert.Heading>
    </Alert>
  );
};

export const FooterMessage = () => {
  const { t: localize } = useTranslation();
  const history = useHistory();
  const signupRoute = location.pathname === '/identify';

  return (
    <>
      <Alert color='teal'>
        <Alert.Heading style={{ fontSize: '1rem' }}>
          {signupRoute ? (
            <div>
              {localize('NewUser')} ?
              <Badge
                bg='light'
                text='dark'
                style={{ cursor: 'pointer' }}
                onClick={() => history.push('/signup')}
              >
                {localize('SignupHere')}
              </Badge>
              {localize('Instead')}
            </div>
          ) : (
            <div>
              {localize('ExistingUser')} ?
              <Badge
                bg='light'
                text='dark'
                style={{ cursor: 'pointer' }}
                onClick={() => history.push('/identify')}
              >
                {localize('LoginHere')}
              </Badge>
              {localize('LoginHereInstead')}
            </div>
          )}
        </Alert.Heading>
      </Alert>
    </>
  );
};
