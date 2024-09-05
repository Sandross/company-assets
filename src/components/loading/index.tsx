import React from 'react';
import styles from './style.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.tractianText}>TRACTIAN</div>
      <div className={styles.spinner}/>
    </div>
  );
};

export default Loading;
