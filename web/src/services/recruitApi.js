
import request from '@/utils/request';

// 添加公司
export async function addCompany(params) {
  return request('/api/recruit/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

// 修改公司
export async function editCompany(params = {}) {
  return request(`/api/recruit/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 查询公司列表
export async function queryCompany(params) {
  console.log('params = ',params);
  return request(`/api/recruit/list`,{
    method: 'POST',
    data:{
      ...params
    }
  });
}

// 删除公司
export async function deleteCompany(params) {
  console.log('params = ',params)
  return request(`/api/recruit/del/${ params.id }`, {
    method: 'delete',
    data: {
      ...params
    },
  });
}

// 下载公司模板
export async function download(params) {
  console.log('params',params)
  return request('/api/download', {
    method: 'get',
    data: {
      ...params
    },
  });
}

