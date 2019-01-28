import { stringify } from 'qs';
import request from '@/utils/request';


import { api as apiConfig } from '../../config/api';



export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryUserList(params) {
  return request(`https://www.easy-mock.com/mock/5c409b38fe5f685c94744457/example/user/list?${stringify(params)}`);
}


export async function queryUserDetail(params) {

  return request(`${apiConfig.userDetail.getUserDetail}?id=${params.id}`);

}

export async function queryUserExam(params) {

  return request(`${apiConfig.userDetail.studySpecialPape}?userId=${params.userId}&specialId=${params.specialId}`);
}

// 用户-用户专项闯关集合 进度
export async function queryUserSpecial(params) {

  return request(`${apiConfig.userDetail.studyUserSpecial}?userId=${params.userId}`);
}




export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('https://www.easy-mock.com/mock/5c409b38fe5f685c94744457/example/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function queryExamList(params = {}) {
  return request(`https://www.easy-mock.com/mock/5c409b38fe5f685c94744457/example/api/exam/list?${stringify(params)}`);
}
export async function queryDataAnalysis(params = {}) {
  return request(`/api/data/analysis?${stringify(params)}`);
}
export async function queryBasicData(params = {}) {
  return request(`/api/basic/data?${stringify(params)}`);
}
