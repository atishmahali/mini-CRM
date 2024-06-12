import axios from 'axios';

/* Error Action */
import { returnErrors } from './errorActions';
import {
  CLEAR_ERROR,
  ADD_CUSTOMER,
  CUSTOMER_CREATED,
  UPDATE_CUSTOMER,
  CUSTOMER_DELETED,
  CUSTOMER_FAIL,
  DELETE_CUSTOMER
} from './types';

/* CRUD */
/* Create Customer */
export const createCustomer = ({ name, email, filter, audience }) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //* Request Body
  const body = JSON.stringify({ name, email, filter, audience });

  try {
    const { data } = await axios.post('/api/customer/create', body, config);
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_CUSTOMER, payload: data });
    dispatch({ type: CUSTOMER_CREATED });
  } catch (err) {
    dispatch({ type: CUSTOMER_FAIL });
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, 'CUSTOMER_ERROR')
    );
  }
};

/* Read Customers */
export const getCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/customer');
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_CUSTOMER, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

/* Update Customer */
export const updateCustomer = ({ name, email, filter, audience, slug, uid }) => async (dispatch) => {
  //* Request Body
  const body = JSON.stringify({
    name,
    email,
    filter,
    audience,
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
    await axios.put('/api/customer', body, config);
    dispatch({ type: UPDATE_CUSTOMER });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'UPDATE_CUSTOMER_ERROR'
      )
    );
  }
};

/* Delete Customer */
export const deleteCustomer = (uid) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.delete(`/api/customer/${uid}`, config);
    dispatch({ type: DELETE_CUSTOMER });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};
