import { queryUserDetail } from '@/services/api';
import { debug } from 'util';

export default {
    namespace: 'userdetail',

    state: {
        userDetail: null
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryUserDetail, payload);
            // debugger
            if (response.code === 1) {
                yield put({
                    type: 'save',
                    payload: response.data,
                });
            }
        },
    },

    reducers: {
        save(state, action) {
            // debugger
            return {
                ...state,
                userDetail: action.payload,
            };
        },
    },
};
