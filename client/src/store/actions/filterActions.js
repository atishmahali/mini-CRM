import axios from 'axios';

/* Error Action */
import { returnErrors } from './errorActions';
import { CLEAR_ERROR, ADD_FILTER, FILTER_FAIL, FILTER_CREATED, UPDATE_FILTER, FILTER_DELETED } from './types';

/* CRUD */

/* Create Filter */
export const createFilter = ({ name }) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //* Request Body
  const body = JSON.stringify({ name });

  try {
    const { data } = await axios.post('/api/filter/create', body, config);
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_FILTER, payload: data });
    dispatch({ type: FILTER_CREATED });
  } catch (err) {
    dispatch({ type: FILTER_FAIL });
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, 'FILTER_FAIL')
    );
  }
};

/* Read Filter */
export const getFilter = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/filter');
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_FILTER, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

/* Update Filter */
export const updateFilter = ({ filter_name, name, slug, uid }) => async (dispatch) => {
  //* Request Body
  const body = JSON.stringify({
    filter_name,
    name,
    slug,
    uid,
  });

  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put('/api/filter', body, config);
    dispatch({ type: UPDATE_FILTER });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'UPDATE_FILTER_ERROR'
      )
    );
  }
};

/* Delete Filter */
export const deleteFilter = (id) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //* Request Body
  const body = { filter_id: id };

  try {
    await axios.delete('/api/filter', { data: body, ...config });
    dispatch({ type: FILTER_DELETED });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};
