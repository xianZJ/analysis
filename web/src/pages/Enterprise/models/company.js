import { queryCompany,addCompany,deleteCompany,editCompany } from '@/services/companyApi';
import { message } from 'antd'
export default {
  namespace: 'company',
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
        type: 'updateCompanyList',
        payload: response,
      });
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
    updateCompanyList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
