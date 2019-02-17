import {
  queryPaperList,
  createPaper,
  queryPaperDetail,
  updatePaperState,
  deletePaper,
  updatePaper,
} from '@/services/api';

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
    paperDetail: {},
    paperTotal: '',
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //       if (pathname == '/exam/list') {
  //         dispatch({
  //           type: 'operate/fetchSpecialList',
  //         });
  //       }
  //     });
  //   },
  // },

  effects: {
    *createPaper({ payload, callback }, { call, put }) {
      const response = yield call(createPaper, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *updatePaperState({ payload, callback }, { call, put }) {
      const response = yield call(updatePaperState, payload);

      if (response.data && response.data.code === 1) {
        if (callback) callback();
      }
    },
    *deletePaper({ payload, callback }, { call, put }) {
      const { data } = yield call(deletePaper, payload);
      if (data.code === 1) {
        if (callback) callback();
      }
    },
    *updatePaper({ payload, callback }, { call, put }) {
      const response = yield call(updatePaper, payload);
      debugger;
      if (response.data && response.data.code === 1) {
        if (callback) callback();
      }
    },
    *fetchPaperList({ payload }, { call, put }) {
      const { data } = yield call(queryPaperList, payload);
      const { code, data: list } = data;
      // debugger;
      if (code === 1) {
        yield put({
          type: 'savePaperList',
          payload: Array.isArray(list.list) ? list.list : [],
        });

        yield put({
          type: 'savePaperTotal',
          payload: list.total,
        });
      }
    },
    *fetchPaperDetail({ payload, callback }, { call, put }) {
      const { data } = yield call(queryPaperDetail, payload);
      // debugger;
      if (data.code === 1) {
        yield put({
          type: 'savePaperDetail',
          payload: data.data,
        });
        if (callback) callback(data.data);
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
    savePaperTotal(state, action) {
      return {
        ...state,
        paperTotal: action.payload,
      };
    },
  },
};
