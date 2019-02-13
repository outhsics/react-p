import { queryUserList, updateUser } from '@/services/api';

export default {
  namespace: 'userlist',

  state: {
    data: {
      list: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      // debugger
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.data,
        });
      }
    },
    *updateUser({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      // debugger
      if (response.data && response.data.code === 1) {
        if (callback) callback();
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
