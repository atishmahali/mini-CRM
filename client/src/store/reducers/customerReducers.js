import { ADD_CUSTOMER, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "../actions/types";

const initialState = {
  customers: [],
  updated: false,
  deleted: false,
  created: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, ...payload],
      };
    case "CUSTOMER_CREATED":
      return {
        ...state,
        created: true,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        updated: true,
      };

    case DELETE_CUSTOMER:
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
