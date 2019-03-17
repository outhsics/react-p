import {  getReportBase, getReportPaper } from '@/services/api';

export default {
  namespace: 'report',

  state: {
    // visitData: [],
    // visitData2: [],
    // salesTypeDataOffline: [],
    // loading: false,
    specialStats:'',
    userStats:''
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getReportBase);
      if(response.data.code===1){
        yield put({
          type: 'save',
          payload: {
            specialStats:response.data.data.specialStats,
            userStats:response.data.data.userStats,
          }
        });
      }
    },
    *fetchPaperData(_, { call, put }) {
      const response = yield call(getReportPaper);

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