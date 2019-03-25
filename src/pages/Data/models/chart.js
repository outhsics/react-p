import { getReportPaper, fakeChartData } from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    paperData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *getReportPaper({payload,callbackPaperData}, { call, put }) {
      const response = yield call(getReportPaper,payload);
      // debugger
      if(response.data.code ===1){
        yield put({
          type: 'save',
          payload: {
            paperData: response.data.data,
          },
        });
        // debugger
        if(callbackPaperData) callbackPaperData(response.data.data)
      }
   
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // clear() {
    //   return {
    //     visitData: [],
    //     visitData2: [],
    //     salesData: [],
    //     searchData: [],
    //     offlineData: [],
    //     offlineChartData: [],
    //     salesTypeData: [],
    //     salesTypeDataOnline: [],
    //     salesTypeDataOffline: [],
    //     radarData: [],
    //   };
    // },
  },
};
