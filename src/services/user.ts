import {request} from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}
export function queryCurrentByLocal() {
  const authority = localStorage.getItem('rs-authority');
  if (authority !== null) {
    return JSON.parse(authority)
  }
  return null;
}

export function saveCurrentByLocal(authority: any) {
  localStorage.setItem('rs-authority', JSON.stringify(authority));
}

