
import request from '@/utils/request';

// 添加公司
export async function addDedicator(params) {
  return request('/api/dedicator/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

// 修改公司
export async function editDedicator(params = {}) {
  return request(`/api/dedicator/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 查询公司列表
export async function queryDedicator(params) {
  console.log('params = ',params);
  return request(`/api/dedicator/list`,{
    method: 'POST',
    data:{
      ...params
    }
  });
}

// 删除公司
export async function deleteDedicator(params) {
  console.log('params = ',params)
  return request(`/api/dedicator/del/${ params.id }`, {
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

