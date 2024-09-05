import React from 'react';
import styles from './style.module.scss';
import { IErrorProps } from '../../interfaces';

const Error: React.FC<IErrorProps> = ({message}) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorText}>{String(message)}</div>
      <div className={styles.errorIcon}>⚠️</div>
    </div>
  );
};

export default Error;
