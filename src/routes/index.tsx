import { BrowserRouter as Router, Routes as Routers, Route } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';

const Routes: React.FC = () => {
  return (
    <Router>
      <Routers>
        <Route path="/" element={<Home />} />
      </Routers>
    </Router>
  );
};

export default Routes;
