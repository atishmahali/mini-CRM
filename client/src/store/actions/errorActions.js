import { GET_ERROR, CLEAR_ERROR } from "./types";	

export const returnErrors = (msg, status, id =  null) =>{
    return{
        type: GET_ERROR,
        payload: {msg, status, id}
    };
};

//Clear errors
export const clearErrors = () => {
    return{
        type: CLEAR_ERROR,
    };
};