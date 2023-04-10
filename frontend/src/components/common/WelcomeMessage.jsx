import { useLocation } from 'react-router-dom';
import { Alert, Badge } from 'react-bootstrap';

export const HeaderMessage = () => {
  const location = useLocation();
  const signupRoute = location.pathname === '/login';

  return (
    <Alert color='teal'>
      <div>
        <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
          {signupRoute ? 'Get started ' : 'welcome back'}
        </Alert.Heading>
      </div>
      <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
        {location.pathname !== '/login'
          ? 'Create New Account'
          : 'Login with email and password'}
      </Alert.Heading>
    </Alert>
  );
};

export const FooterMessage = ({ changeAuthMode, authMode }) => {
  return (
    <>
      <Alert color='teal'>
        <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
          {authMode !== 'login' ? (
            <div>
              New User ?
              <Badge
                bg='light'
                text='dark'
                style={{ cursor: 'pointer' }}
                onClick={changeAuthMode}
              >
                Signup Here{' '}
              </Badge>
              Instead
            </div>
          ) : (
            <p>
              Existing User ?
              {
                <Badge
                  bg='light'
                  text='dark'
                  style={{ cursor: 'pointer' }}
                  onClick={changeAuthMode}
                >
                  Login here Instead
                </Badge>
              }
            </p>
          )}
        </Alert.Heading>
      </Alert>
    </>
  );
};
