import { queryBasicData, querySpecialList,saveConfig } from '@/services/api';

export default {
  namespace: 'operate',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    specialList: [],
    writconfig: []

  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBasicData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSpecialList({ }, { call, put }) {
      const { data } = yield call(querySpecialList);
      const { code, data: list } = data;
      // const response = yield call(querySpecialList);
      if (code === 1) {
        yield put({
          type: 'saveSpecialList',
          payload: list,
        });
      }
    },
    *addConfig({ payload }, { call, put }) {
      const response = yield call(saveConfig, payload);
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
      return {
        ...state,
        data: action.payload,
      };
    },
    saveSpecialList(state, action) {
      // debugger
      return {
        ...state,
        specialList: action.payload,
      };
    },
  },
};
