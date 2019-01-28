import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('https://www.easy-mock.com/mock/5c409b38fe5f685c94744457/example/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
