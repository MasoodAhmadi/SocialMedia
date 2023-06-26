import React, { useEffect, useState } from 'react';
import { loadUser } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

import Identification from './identification.page';
import SignupPage from './signup.page.';
function Layout() {
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState('identify');

  const changeAuthMode = () => {
    setAuthMode(authMode === 'identify' ? 'signup' : 'identify');
  };
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (authMode === 'identify') {
    return (
      <>
        <Identification changeAuthMode={changeAuthMode} authMode={authMode} />
      </>
    );
  }
  return <SignupPage changeAuthMode={changeAuthMode} authMode={authMode} />;
}
export default Layout;
