import {  getReportBase, getReportPaper } from '@/services/api';

export default {
  namespace: 'report',

  state: {
    visitData: [],
    visitData2: [],
    salesTypeDataOffline: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getReportBase);
      debugger
      if(response.data.code===1){
        yield put({
          type: 'save',
          payload: response.data
        });
      }
    },
    *fetchPaperData(_, { call, put }) {
      const response = yield call(getReportPaper);
      debugger
      yield put({
        type: 'save',
        payload: {
          paperData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesTypeDataOffline: [],
      };
    },
  },
};