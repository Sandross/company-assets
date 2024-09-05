import React from 'react';
import AssetsBar from '../../components/assetsBar';
import Layout from '../../components/layout';
import ErrorBoundary from '../../error';
import styles from './style.module.scss';
const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <Layout>
        <ErrorBoundary>
          <AssetsBar />
        </ErrorBoundary>
      </Layout>
    </div>
  );
};

export default Home;
