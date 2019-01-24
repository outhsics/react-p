import { queryUserDetail, queryUserExam } from '@/services/api';
import { debug } from 'util';

export default {
    namespace: 'userdetail',

    state: {
        data: {
            userDetail: null
        },
        userExam: null
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryUserDetail, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *loadUserExam({ payload }, { call, put }) {
            const response = yield call(queryUserExam, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};
