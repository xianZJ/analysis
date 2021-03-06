import { queryCompany,addCompany,download,deleteCompany,editCompany } from '@/services/recruitApi';
import { message } from 'antd'
export default {
  namespace: 'recruit',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload = ',payload);
      const response = yield call(queryCompany, payload);
      yield put({
        type: 'updateRecruitList',
        payload: response,
      });
    },
    *download({ payload }, { call }) {
      console.log('download payload = ',payload);
      const response = yield call(download, payload);
      if(response && response.code === 200){
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *add({ payload }, { call }) {
      const response = yield call(addCompany, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *edit({ payload }, { call }) {
      const response = yield call(editCompany, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *delete({payload},{call}){
      const response = yield call(deleteCompany, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
  },

  reducers: {
    updateRecruitList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
