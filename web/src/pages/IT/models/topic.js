import { queryTopic,addTopic,deleteTopic,editTopic } from '@/services/topicApi';
import { message } from 'antd'

export default {
  namespace: 'topic',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('payload = ',payload);
      const response = yield call(queryTopic, payload);
      yield put({
        type: 'updateTopicList',
        payload: response,
      });
    },
    *add({ payload }, { call }) {
      const response = yield call(addTopic, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *edit({ payload }, { call }) {
      const response = yield call(editTopic, payload);
      if(response && response.code === 200){
        message.success(response.msg);
        const { resolve } = payload
        !!resolve && resolve(response)
      }else{
        message.error(response.msg);
      }
    },
    *delete({payload},{call}){
      const response = yield call(deleteTopic, payload);
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
    updateTopicList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
