import { combineReducers } from "redux"


/* Reducers */
import filterReducers from './filterReducers';
import customerReducers from './customerReducers';
import communication_logReducers from './communication_logReducers';
import errorReducer from "./errorReducer";



export default combineReducers({
 cus: customerReducers,
 fil: filterReducers,
 com: communication_logReducers,
 err: errorReducer,
 
});