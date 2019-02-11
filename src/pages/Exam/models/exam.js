import { queryPaperList, createPaper, queryPaperDetail } from '@/services/api';

export default {
  namespace: 'examlist',

  state: {
    data: {
      list: [],
      pagination: {},
      tabDefaultActiveKey: 'challenge',
      tabActiveKey: 'challenge',
    },
    paperList: [],
    paperDetail: '',
  },

  effects: {
    *createPaper({ payload, callback }, { call, put }) {
      const response = yield call(createPaper, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchPaperList({ payload }, { call, put }) {
      const { data } = yield call(queryPaperList, payload);
      const { code, data: list } = data;

      if (code === 1) {
        yield put({
          type: 'savePaperList',
          payload: Array.isArray(list.list) ? list.list : [],
        });
      }
    },
    *fetchPaperDetail({ payload }, { call, put }) {
      const { data } = yield call(queryPaperDetail, payload);
      const { code, data: list } = data;

      if (code === 1) {
        yield put({
          type: 'savePaperDetail',
          payload: list,
        });
      }
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
    savePaperList(state, action) {
      return {
        ...state,
        paperList: action.payload,
      };
    },
    savePaperDetail(state, action) {
      return {
        ...state,
        paperDetail: action.payload,
      };
    },
  },
};
