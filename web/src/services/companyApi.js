import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryCompany(params) {
  return request(`/api/company/list?${stringify(params)}`);
}
export async function removeCompany(params) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addCompany(params) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCompany(params = {}) {
  return request(`/api/company?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
