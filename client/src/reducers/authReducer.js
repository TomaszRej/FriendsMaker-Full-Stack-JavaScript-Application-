import {
  USER_LOADED,
  USER_LOADING,
  // AUTH_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_LOGGED_USER
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  tokenExp: localStorage.getItem('tokenExp'),
  isAuthenticated: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem('user'))
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case USER_LOADING:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case USER_LOADED:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     isLoading: false,
    //     user: action.payload
    //   };

    case REGISTER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case REGISTER_SUCCESS:
      //localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        //isAuthenticated: true,
        isLoading: false
      };
    // case AUTH_ERROR:
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true
      }
    // case LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        tokenExp: action.payload.tokenExp,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false
      }
    // case LOGIN_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    // case LOGOUT_SUCCESS:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExp');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false

      }
    case REGISTER_FAIL:
      //localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        //isAuthenticated: false,
        isLoading: false
      };

    case UPDATE_LOGGED_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}