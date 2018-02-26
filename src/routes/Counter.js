import React from 'react';
import { connect } from 'dva';
import styles from './Counter.css';
import CounterComponent from "../components/Counter";
import MainLayout from '../components/MainLayout/MainLayout';


function Counter({location}) {
  return (
    <MainLayout location={location}>
    <div className={styles.normal}>
      <CounterComponent />
    </div>
    </MainLayout>
  );
}


export default connect()(Counter);
