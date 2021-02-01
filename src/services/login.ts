import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
