import { queryCompany,addCompany } from '@/services/companyApi';
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
    *add({ payload }, { call, put }) {
      const { resolve } = payload
      console.log('payload ==== ',payload)
      const response = yield call(addCompany, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if(response && response.code === 200){
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
