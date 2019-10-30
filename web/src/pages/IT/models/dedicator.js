import { queryDedicator,addDedicator,deleteDedicator,editDedicator } from '@/services/dedicatorApi';
import { message } from 'antd'

export default {
  namespace: 'dedicator',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload = ',payload);
      const response = yield call(queryDedicator, payload);
      yield put({
        type: 'updateDedicatorList',
        payload: response,
      });
    },
    *add({ payload }, { call }) {
      const response = yield call(addDedicator, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *edit({ payload }, { call }) {
      const response = yield call(editDedicator, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *delete({payload},{call}){
      const response = yield call(deleteDedicator, payload);
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
    updateDedicatorList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
