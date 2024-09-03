import { BrowserRouter as Router, Routes as Routers, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';
import { Provider } from 'react-redux';
import { store } from '../redux';

const Routes: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routers>
          <Route path="/" element={<Home />} />
        </Routers>
      </Provider>
    </Router>
  );
};

export default Routes;
