import { queryUserExam, queryUserSpecial } from '@/services/api';


export default {
    namespace: 'userexam',

    state: {
        userExam: [],
        UserSpecial: [],
        pace: '',
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryUserExam, payload);
            // debugger
            if (response.data && response.data.code === 1) {

                yield put({
                    type: 'save',
                    payload: response.data.data,
                });
            }
        },
        *fetchUserSpecial({ payload }, { call, put }) {
            const response = yield call(queryUserSpecial, payload);
            // debugger
            if (response.data && response.data.code === 1) {
                yield put({
                    type: 'saveUserSpecial',
                    payload: response.data.data,
                });
            }
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                userExam: action.payload,
            };
        },
        saveUserSpecial(state, action) {
            return {
                ...state,
                UserSpecial: action.payload,
            };
        },
        savePace(state, action) {
            return {
                ...state,
                pace: action.payload,
            };
        },
    },
};
