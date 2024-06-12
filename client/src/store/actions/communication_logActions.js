import axios from 'axios';

/* Error Action */
import { returnErrors } from './errorActions';
import {
  CLEAR_ERROR,
  ADD_COMMUNICATION_LOG,
  COMMUNICATION_LOG_CREATED,
  UPDATE_COMMUNICATION_LOG,
  COMMUNICATION_LOG_FAIL,
  COMMUNICATION_LOG_DELETED
} from './types';

/* CRUD */
/* Create Communication Log */
export const createCommunicationLog = ({ name }) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //* Request Body
  const body = JSON.stringify({ name });

  try {
    const { data } = await axios.post('/api/communication_log/create', body, config);
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_COMMUNICATION_LOG, payload: data });
    dispatch({ type: COMMUNICATION_LOG_CREATED });
  } catch (err) {
    dispatch({ type: COMMUNICATION_LOG_FAIL });
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, 'COMMUNICATION_LOG_ERROR')
    );
  }
};

/* Read Communication Log */
export const getCommunicationLog = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/communication_log");
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: ADD_COMMUNICATION_LOG, payload: res.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

/* Update Communication Log */
export const updateAcommunicationLog = ({ audience_type, slug, uid }) => async (dispatch) => {
  //* Request Body
  const body = JSON.stringify({
    audience_type, 
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
    await axios.put('/api/communication_log', body, config);
    dispatch({ type: UPDATE_COMMUNICATION_LOG });
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data.msg,
        err.response.status,
        'UPDATE_COMMUNICATION_LOG_ERROR'
      )
    );
  }
};

/* Delete Communication Log */
export const deleteCommunicationLog = (uid) => async (dispatch) => {
  //* Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.delete(`/api/communication_log/${uid}`, config);
    dispatch({ type: COMMUNICATION_LOG_DELETED });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};
