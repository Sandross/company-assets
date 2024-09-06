import React from 'react';
import ErrorBoundary from '../../error';
import LoginForm from '../../components/loginForm';
import styles from './style.module.scss';
const Login:React.FC = () => {
  return (
    <div className={styles.login}>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};

export default Login;
