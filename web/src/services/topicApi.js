
import request from '@/utils/request';

// 添加公司
export async function addTopic(params) {
  return request('/api/topic/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

// 修改公司
export async function editTopic(params = {}) {
  return request(`/api/topic/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 查询公司列表
export async function queryTopic(params) {
  console.log('params = ',params);
  return request(`/api/topic/list`,{
    method: 'POST',
    data:{
      ...params
    }
  });
}

// 删除公司
export async function deleteTopic(params) {
  console.log('params = ',params)
  return request(`/api/topic/del/${ params.id }`, {
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

