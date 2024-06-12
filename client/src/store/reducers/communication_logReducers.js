import { ADD_FILTER, UPDATE_FILTER } from "../actions/types";

const initialState = {
  filters: [],
  deleted: false,
  updated: false,
  created: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: [...state.filters, ...payload],
      };
    case UPDATE_FILTER:
      return {
        ...state,
        updated: true,
      };
    case "FILTER_CREATED":
      return {
        ...state,
        created: true,
      };
    case "FILTER_DELETED":
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
