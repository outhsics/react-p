// /**
//  * request 网络请求工具
//  * 更详细的 api 文档: https://github.com/umijs/umi-request
//  */
// import { extend } from 'umi-request';
// import { notification } from 'antd';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

// /**
//  * 异常处理程序
//  */
// const errorHandler = error => {
//   const { response = {} } = error;
//   const errortext = codeMessage[response.status] || response.statusText;
//   // debugger
//   const { status, url } = response;

//   notification.error({
//     message: `请求错误 ${status}: ${url}`,
//     description: errortext,
//   });
// };

// const data = await response.json();

// const ret = {
//   data,
//   headers: {},
// };

// if (response.headers.get('x-token')) {
//   ret.headers['x-token'] = response.headers.get('x-token');
// }

// /**
//  * 配置request请求时的默认参数
//  */
// const request = extend({
//   errorHandler, // 默认错误处理
//   credentials: 'include', // 默认请求是否带上cookie
//   headers: {
//     'content-type': 'application/json;charset=UTF-8'  // 统一的headers
//   },
// });

// export default request;

import axios from 'axios';
import { notification,message } from 'antd';

const service = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 10000,
  headers: {
  //   'X-Custom-Header': 'foobar'
  "S-Token":atob(localStorage['XTOKEN'] || ''),
  'Cache-Control': 'no-cache',
  }
});

// respone interceptor
service.interceptors.response.use(

  response => {
      // debugger

    if(response.config.url.includes('admin/sysUser/login')) {
      const token = response.data.data;
      if(token && token !=='null') {
        localStorage['XTOKEN'] = btoa(token);
      }
      // window.location.href = '/'
      return response;
    }

    if(!localStorage['XTOKEN']) {
      // alert(2)
      // notification.error({
      //   message: response.data.msg
      // });
      window.location.href = '/admin/login'
      // return false;

      // return response;
    }

    // console.log(response)
    // debugger
    return response;
  },
  error => {
    // console.log('err' + error); // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    notification.error({
      message: error.message,
      description: error.message,
    });
    return Promise.reject(error);
  }
);

export default service;
