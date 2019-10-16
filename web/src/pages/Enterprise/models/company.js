import { queryCompany, removeCompany, addCompany, updateCompany } from '@/services/companyApi';

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
        payload: response.data,
      });
    },
  },

  reducers: {
    updateCompanyList(state, action) {
      console.log('action = ', action);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
