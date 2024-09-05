import React from 'react';
import Header from '../header/input';
import styles from './style.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
