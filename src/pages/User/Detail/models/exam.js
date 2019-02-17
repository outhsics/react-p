import { queryUserExam, queryUserSpecial } from '@/services/api';

export default {
  namespace: 'userexam',

  state: {
    userExam: [],
    UserSpecial: [],
    pace: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserExam, payload);
      // debugger;
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'save',
          payload: response.data.data,
        });
      }
    },
    *fetchUserSpecial({ payload, callback }, { call, put }) {
      const response = yield call(queryUserSpecial, payload);
      if (response.data && response.data.code === 1) {
        yield put({
          type: 'saveUserSpecial',
          payload: response.data.data,
        });

        if (callback) callback(response.data.data[0].id);
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        userExam: action.payload,
      };
    },
    saveUserSpecial(state, action) {
      return {
        ...state,
        UserSpecial: action.payload,
      };
    },
    savePace(state, action) {
      // debugger
      return {
        ...state,
        pace: action.payload,
      };
    },
  },
};
