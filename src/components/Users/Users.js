import React from "react";
import { routerRedux } from "dva/router";
import { Table, Pagination, Popconfirm } from "antd";
import styles from "./Users.css";
import { PAGE_SIZE } from "../../constants";
import  UserModal from "./UserModal.js";

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

  function editHandler(id, values) {
        dispatch({
          type: 'users/patch',
          payload: { id, values },
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
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
           <a href="javascript:void(0)">Edit</a>
          </UserModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
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
