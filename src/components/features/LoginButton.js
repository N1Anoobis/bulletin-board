import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import styles from './Button.module.scss';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  function login() {
    loginWithRedirect();
  }

  return (
    !isAuthenticated && (
      <button onClick={login}>
        Log In
      </button>
    )
  );
};

export default LoginButton;