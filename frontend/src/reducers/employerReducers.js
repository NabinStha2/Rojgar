import {
  EMPLOYER_REGISTRATION_FAILED,
  EMPLOYER_REGISTRATION_REQUEST,
  EMPLOYER_REGISTRATION_SUCCESS,
  GET_EMPLOYER_PROFILE_FAILED,
  GET_EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_DETAILS_RESET,
  GET_EMPLOYER_PROFILE_SUCCESS,
  EDIT_EMPLOYER_REQUEST,
  EDIT_EMPLOYER_SUCCESS,
  EDIT_EMPLOYER_FAILED,
} from "../constants/employerConstant";

export const employerReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYER_REGISTRATION_REQUEST:
      return { ...state, loading: true };
    case EMPLOYER_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        employerProfile: action.payload,
      };
    case EMPLOYER_REGISTRATION_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_EMPLOYER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case GET_EMPLOYER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        employerProfile: action.payload,
      };
    case GET_EMPLOYER_PROFILE_FAILED:
      return { ...state, loading: false, error: action.payload };

    case EDIT_EMPLOYER_REQUEST:
      return { ...state, loading: true };
    case EDIT_EMPLOYER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_EMPLOYER_FAILED:
      return { loading: false, error: action.payload };

    case EMPLOYER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
