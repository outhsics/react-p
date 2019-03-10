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
      // if(response.data.code ===1){
        // window.location = ''
        // routerRedux.
        // debugger
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: response,
        // });
        // message.info('登录成功')

        // request.defaults.headers.common['S-Token'] = response.data.data;


        // res.send({
        //   status: 'ok',
        //   type,
        //   currentAuthority: 'admin',
        // });
      // }else {
      // debugger

        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: response,
        // });
        // return message.error('登录错误')
        // return
      // }
      // Login successfully
      if (response.data.code === 1) {
        // yield put(routerRedux.replace( '/'));
        // routerRedux.push({
          yield put(
            routerRedux.push({
              pathname: '/',
              // search: stringify({
              //   redirect: window.location.href,
              // }),
            })
          );
        
      }else {
        message.info('登录失败')

      }

        // reloadAuthorized();
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;

        // if (redirect) {

        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = redirect;
        //     return;
        //   }
        // }

      // }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      debugger
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
