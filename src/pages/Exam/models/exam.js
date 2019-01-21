import { queryExamList } from '@/services/api';

export default {
  namespace: 'examlist',

  state: {
    data: {
      list: [],
      pagination: {},
      tabDefaultActiveKey: 'challenge',
      tabActiveKey: 'challenge',
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExamList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      // debugger

      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
