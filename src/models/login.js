import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { adminLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';
import request from '@/utils/request';


export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(adminLogin, payload);
      if(response.data.code ===1){
        // debugger
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        request.defaults.headers.common['S-Token'] = response.data.data;


        // res.send({
        //   status: 'ok',
        //   type,
        //   currentAuthority: 'admin',
        // });
      }else {
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: response,
        // });
        message.error('登录错误')
      }
      // Login successfully
      if (response.data.code === 1) {
        // debugger
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/admin/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority('admin');
      return {
        ...state,
        status: 'ok',
        // type: payload.type,
      };
    },
  },
};
