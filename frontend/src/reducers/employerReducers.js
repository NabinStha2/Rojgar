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
  EDIT_EMPLOYER_RATING_REQUEST,
  EDIT_EMPLOYER_RATING_SUCCESS,
  EDIT_EMPLOYER_RATING_FAILED,
  GET_ALL_EMPLOYER_REQUEST,
  GET_ALL_EMPLOYER_SUCCESS,
  GET_ALL_EMPLOYER_FAILED,
} from "../constants/employerConstant";

export const employerReducer = (
  state = { employerProfile: null, allEmployerProfile: [] },
  action
) => {
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
      return { ...state, error: null, loading: true };
    case GET_EMPLOYER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        employerProfile: action.payload.employerProfile,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        employerPosts: action.payload.employerPosts,
      };
    case GET_EMPLOYER_PROFILE_FAILED:
      return { loading: false, error: action.payload };

    case GET_ALL_EMPLOYER_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_EMPLOYER_SUCCESS:
      return {
        ...state,
        loading: false,
        allEmployerProfile: action.payload.employerProfile,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
      };
    case GET_ALL_EMPLOYER_FAILED:
      return { loading: false, error: action.payload };

    case EDIT_EMPLOYER_REQUEST:
      return { ...state, error: null, loading: true };
    case EDIT_EMPLOYER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_EMPLOYER_FAILED:
      return { loading: false, error: action.payload };

    case EDIT_EMPLOYER_RATING_REQUEST:
      return { ...state, error: null, loading: true };
    case EDIT_EMPLOYER_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_EMPLOYER_RATING_FAILED:
      return { loading: false, error: action.payload };

    case EMPLOYER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
