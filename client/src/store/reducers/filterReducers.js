import { ADD_FILTER, FILTER_CREATED, FILTER_DELETED, UPDATE_FILTER } from '../actions/types';

const initialState = {
    loading: true,
    filter: [], 
    created: false,
    updated: false,
    deleted: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_FILTER:
            return {
                ...state,
                filters: [...state.filter, payload], 
            };
        case FILTER_CREATED:
            return {
                ...state,
                created: true,
            };
        case UPDATE_FILTER:
            return {
                ...state,
                updated: true,
            };
        case FILTER_DELETED:
            return {
                ...state,
                deleted: true,
            };
        default:
            return state;
    }
};
