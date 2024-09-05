import React from 'react';
import styles from './style.module.scss';
import tractianLogo from '../../assets/logo.png';
const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={tractianLogo} alt="logo" className={styles['container-logo']} />

      <div className={styles['container-companies']}>

      </div>
    </div>
  );
};

export default Header;
