import {
  queryBasicData,
  querySpecialList,
  saveConfig,
  updateSpecial,
  createSpecial,
  deleteSpecial,
} from '@/services/api';

export default {
  namespace: 'operate',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    specialList: [],
    writconfig: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBasicData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSpecialList({ payload }, { call, put }) {
      const { data } = yield call(querySpecialList, payload);
      const { code, data: list } = data;
      if (code === 1) {
        yield put({
          type: 'saveSpecialList',
          payload: list,
        });
      }
    },
    *addConfig({ payload, callback }, { call, put }) {
      const { data } = yield call(saveConfig, payload);
      const { code, data: config } = data;

      if (code === 1) {
        yield put({
          type: 'save',
          payload: config,
        });
        if (callback) callback();
      }
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
    *updateSpecial({ payload, callback }, { call }) {
      const { data } = yield call(updateSpecial, payload);

      if (data.code === 1) {
        if (callback) callback();
      }
    },
    *createSpecial({ payload, callback }, { call, put }) {
      const { data } = yield call(createSpecial, payload);

      if (data.code === 1) {
        if (callback) callback();
      }
    },
    *deleteSpecial({ payload, callback }, { call, put }) {
      const { data } = yield call(deleteSpecial, payload);
      if (data.code === 1) {
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
    saveSpecialList(state, action) {
      // debugger;
      return {
        ...state,
        specialList: action.payload,
      };
    },
  },
};
