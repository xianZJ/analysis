import { queryCompany,addCompany } from '@/services/companyApi';

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
      const response = yield call(queryCompany, payload);
      yield put({
        type: 'updateCompanyList',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addCompany, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
