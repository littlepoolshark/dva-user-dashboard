import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import NotFoundComponent from "../components/NotFound";
import MainLayout from '../components/MainLayout/MainLayout';

function NotFound({location}) {
  return (
    <MainLayout location={location}>
          <div className={styles.normal}>
            <NotFoundComponent />
          </div>
    </MainLayout>
  );
}


export default connect()(NotFound);
