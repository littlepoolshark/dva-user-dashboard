import React from "react";
import { connect } from "dva";
import styles from "./Users.css";
import UsersComponent from "../components/Users/Users";
import MainLayout from "../components/MainLayout/MainLayout";

function Users({ location, ...rest }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersComponent {...rest} />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  let isLoading = state.loading.models.users;
  return {
    list,
    total,
    page,
    isLoading
  };
}

export default connect(mapStateToProps)(Users);
