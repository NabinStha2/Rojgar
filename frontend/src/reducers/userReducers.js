import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESETPW_FAILED,
  USER_RESETPW_REQUEST,
  USER_RESETPW_SUCCESS,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_VERIFY_OTP_FAILED,
  USER_LOGOUT,
} from "../constants/userConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, error: null, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };

    case USER_RESETPW_REQUEST:
      return { ...state, error: null, loading: true };
    case USER_RESETPW_SUCCESS:
      return { ...state, loading: false, userId: action.payload };
    case USER_RESETPW_FAILED:
      return { loading: false, error: action.payload };

    case USER_VERIFY_OTP_REQUEST:
      return { ...state, error: null, loading: true };
    case USER_VERIFY_OTP_SUCCESS:
      return { loading: false, verified: action.payload };
    case USER_VERIFY_OTP_FAILED:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload.userProfile,
        verifyMessage: action.payload.verifyMessage,
      };
    case USER_REGISTER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
