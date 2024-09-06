import { BrowserRouter as Router, Routes as Routers, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';
import { Provider } from 'react-redux';
import { store } from '../redux';
import Login from '../pages/login';

const Routes: React.FC = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <Router>
      <Provider store={store}>
        <Routers>
          <Route path="/" element={accessToken ? <Home/> : <Login/>} />
        </Routers>
      </Provider>
    </Router>
  );
};

export default Routes;
