import React from "react";
import { connect } from "dva";
import styles from "./Counter.css";
import CounterComponent from "../components/Counter";
import MainLayout from "../components/MainLayout/MainLayout";

function Counter({ location, ...otherProps }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <CounterComponent {...otherProps} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    count: state.counter
  };
}

export default connect(mapStateToProps)(Counter);
