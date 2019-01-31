import {
  queryUserList,
  updateUser
} from '@/services/api';

export default {
  namespace: 'userlist',

  state: {
    data: {
      list: [],
    },
    userState: null
  },

  effects: {
    * fetch({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(queryUserList, payload);
      // debugger
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.data,
        });
      }
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    * updateUser({
      payload,
      callback
    }, {
      call,
      put
    }) {
      const response = yield call(updateUser, payload);
      // debugger
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'saveUpdate',
          payload: response,
        });
      }
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveUpdate(state, action) {
      return {
        ...state,
        userState: action.payload,
      };
    },
  },
};
