import { queryUserList, updateUser } from '@/services/api';

export default {
  namespace: 'userlist',

  state: {
    data: {}
  },


  effects: {
    *fetch({ payload,callback }, { call, put }) {
      const response = yield call(queryUserList, payload);
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.data,
        });
        if (callback) callback(response.data.data);
        // if (cbList) cbList(response.data.data.list);
      }
    },
    *updateUser({ payload, callback,cbUpdateUser }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response.data && response.data.code === 1) {
        if (callback) callback();
        // debugger

        if(cbUpdateUser) cbUpdateUser()
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
