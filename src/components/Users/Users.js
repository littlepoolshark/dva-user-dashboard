import React from "react";
import { routerRedux } from "dva/router";
import { Table, Pagination, Popconfirm } from "antd";
import styles from "./Users.css";
import { PAGE_SIZE } from "../../constants";

function Users({
  dispatch,
  list: dataSource,
  total,
  page: current,
  isLoading
}) {
  function deleteHandler(id) {
    dispatch({
      type: "users/remove",
      payload: id
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: "/users",
        query: {
          page
        }
      })
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a href="">{text}</a>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website"
    },
    {
      title: "Opration",
      key: "operation",
      render: (text, { id }) => (
        <span className={styles.operation}>
          <a href="javascript:void(0)">Edit</a>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, id)}
          >
            <a href="javascript:void(0)">Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

export default Users;
