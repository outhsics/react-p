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
  // TODO 分页  pagesize 参数
  return request({
    url: `${apiConfig.queryDataHub.getUserList}`,
    method: 'get',
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    },
  });
}

export async function saveConfig(params) {
  return request({
    url: `${apiConfig.basicData.saveConfig}`,
    method: 'post',
    data: params,
  });
}

export async function configInfo() {
  return request({
    url: `${apiConfig.basicData.configInfo}`,
    method: 'get',
  });
}

export async function updateSpecial(params) {
  return request({
    url: `${apiConfig.special.updateSpecial}`,
    method: 'post',
    data: params,
    responseType: 'json',
  });
}
export async function createSpecial(params) {
  return request({
    url: `${apiConfig.special.createSpecial}`,
    method: 'post',
    data: params,
  });
}
export async function deleteSpecial(params) {
  return request({
    url: `${apiConfig.special.deleteSpecial}`,
    method: 'get',
    params: {
      id: params,
    },
  });
}

export async function queryUserDetail(params) {
  return request(`${apiConfig.userDetail.getUserDetail}?id=${params.id}`);
}

export async function updateUser(params) {
  return request({
    url: `${apiConfig.updateState.updateUser}`,
    method: 'post',
    data: params,
    responseType: 'json',
  });
}

export async function queryUserExam(params) {
  return request(
    `${apiConfig.userDetail.studySpecialPape}?userId=${params.userId}&specialId=${params.specialId}`
  );
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

export async function createPaper(params) {
  return request({
    url: `${apiConfig.paper.createPaper}`,
    method: 'post',
    data: params,
    responseType: 'json',
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

export async function updatePaperState(params) {
  return request({
    url: `${apiConfig.paper.updatePaperState}`,
    method: 'post',
    data: params,
    responseType: 'json',
  });
}

export async function updatePaper(params) {
  return request({
    url: `${apiConfig.paper.updatePaper}`,
    method: 'post',
    data: params,
    responseType: 'json',
  });
}
export async function deletePaper(params) {
  return request({
    url: `${apiConfig.paper.deletePaper}`,
    method: 'get',
    params: {
      id: params,
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
  // return request('https://www.easy-mock.com/mock/5c409b38fe5f685c94744457/example/api/fake_chart_data');
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

export async function queryPaperList(params) {
  return request({
    url: `${apiConfig.paper.queryPaperList}`,
    method: 'get',
    params: {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      specialId: params.specialId,
    },
  });
}
export async function queryPaperDetail(params) {
  return request({
    url: `${apiConfig.paper.queryPaperDetail}`,
    method: 'get',
    params: {
      id: params,
    },
  });
}

export async function queryDataAnalysis(params = {}) {
  return request(`/api/data/analysis?${stringify(params)}`);
}
export async function queryBasicData(params = {}) {
  return request(`/api/basic/data?${stringify(params)}`);
}
export async function querySpecialList() {
  // debugger;
  return request({
    url: `${apiConfig.basicData.querySpecialList}`,
    method: 'get',
  });
}
