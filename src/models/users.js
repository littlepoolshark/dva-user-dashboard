import * as userService from "../services/users";

export default {
  namespace: "users",
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    modify(state, { payload: { id, values: patchItem } }) {
      let newList = state.list.map((item, index) => {
        if (index + 1 === id) {
          patchItem.id = id;
          return patchItem;
        }
        return item;
      });
      return { ...state, list: newList };
    },
    add(state, { payload: values }) {
      let newList = state.list.map(item => item);
      newList.unshift(values);
      return { ...state, list: newList, total: state.total + 1 };
    }
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(userService.fetch, { page });
      yield put({
        type: "save",
        payload: {
          data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10)
        }
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(userService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: "fetch", payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      let patchResult = yield call(userService.patch, id, values);
      yield put({ type: "modify", payload: { id, values } });
    },
    *create({ payload: values }, { call, put, select }) {
      const newItem = yield call(userService.create, values);
      yield put({ type: "add", payload: values });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      //如果要使用 app.unmodel()，subscription 必须返回 unlisten 方法，用于取消数据订阅。
      return history.listen(({ pathname, query }) => {
        if (pathname === "/users") {
          dispatch({
            type: "fetch",
            payload: query
          });
        }
      });
    }
  }
};
