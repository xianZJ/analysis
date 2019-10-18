import { stringify } from 'qs';
import request from '@/utils/request';
// 查询公司列表
export async function queryCompany(params) {
  console.log('params = ',params);
  return request(`/api/company/list`,{
    method: 'POST',
    data:{
      ...params
    }
  });
}
export async function removeCompany(params) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function addCompany(params) {
  return request('/api/company', {
    method: 'POST',
    data: {
      ...params
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
