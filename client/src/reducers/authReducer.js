import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';

const initialState = {
    token:  localStorage.getItem('token'),
    isAuthenticated : null,
    isLoading: false,
    user: null
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            }
        
        case USER_LOADED:
            return  {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user : action.payload
            }
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isAuthenticated: true,
                ...action.payload
            }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token : null,
                user : null,
                isAuthenticated : false,
                isLoading : false
            }
            
        default :  return state
        
            

            
        
    
    }
}