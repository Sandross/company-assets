import React from 'react';
import ErrorBoundary from '../../error';
import LoginForm from '../../components/loginForm';

const Login:React.FC = () => {
  return (
    <div>
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </div>
  );
};

export default Login;
