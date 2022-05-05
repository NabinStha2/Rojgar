import {
  CREATE_TALENT_BIDS_FAILED,
  CREATE_TALENT_BIDS_REQUEST,
  CREATE_TALENT_BIDS_SUCCESS,
  DELETE_TALENT_BIDS_FAILED,
  DELETE_TALENT_BIDS_REQUEST,
  DELETE_TALENT_BIDS_SUCCESS,
  EDIT_TALENT_BIDS_FAILED,
  EDIT_TALENT_BIDS_REQUEST,
  EDIT_TALENT_BIDS_SUCCESS,
  EDIT_TALENT_FAILED,
  EDIT_TALENT_RATING_FAILED,
  EDIT_TALENT_RATING_REQUEST,
  EDIT_TALENT_RATING_SUCCESS,
  EDIT_TALENT_REQUEST,
  EDIT_TALENT_SUCCESS,
  GET_ALL_TALENT_FAILED,
  GET_ALL_TALENT_REQUEST,
  GET_ALL_TALENT_SUCCESS,
  GET_TALENT_PROFILE_FAILED,
  GET_TALENT_PROFILE_REQUEST,
  GET_TALENT_PROFILE_SUCCESS,
  TALENT_DETAILS_RESET,
  TALENT_REGISTRATION_FAILED,
  TALENT_REGISTRATION_REQUEST,
  TALENT_REGISTRATION_SUCCESS,
} from "../constants/talentConstant";

export const talentReducer = (
  state = { talentProfile: null, allTalentProfile: [] },
  action
) => {
  switch (action.type) {
    case TALENT_REGISTRATION_REQUEST:
      return { loading: true };
    case TALENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        talentProfile: action.payload,
      };
    case TALENT_REGISTRATION_FAILED:
      return { loading: false, error: action.payload };

    case GET_TALENT_PROFILE_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_TALENT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        talentProfile: action.payload,
      };
    case GET_TALENT_PROFILE_FAILED:
      return { loading: false, error: action.payload };

    case GET_ALL_TALENT_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ALL_TALENT_SUCCESS:
      return {
        ...state,
        loading: false,
        allTalentProfile: action.payload.talentProfile,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
      };
    case GET_ALL_TALENT_FAILED:
      return { loading: false, error: action.payload };

    case EDIT_TALENT_REQUEST:
      return { ...state, error: null, loading: true };
    case EDIT_TALENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_TALENT_FAILED:
      return { loading: false, error: action.payload };

    case EDIT_TALENT_RATING_REQUEST:
      return { ...state, error: null, loading: true };
    case EDIT_TALENT_RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_TALENT_RATING_FAILED:
      return { loading: false, error: action.payload };

    case CREATE_TALENT_BIDS_REQUEST:
      return { loading: true };
    case CREATE_TALENT_BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        talentProfile: action.payload,
      };
    case CREATE_TALENT_BIDS_FAILED:
      return { loading: false, error: action.payload };

    case EDIT_TALENT_BIDS_REQUEST:
      return { loading: true };
    case EDIT_TALENT_BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        talentProfile: action.payload,
      };
    case EDIT_TALENT_BIDS_FAILED:
      return { loading: false, error: action.payload };

    case DELETE_TALENT_BIDS_REQUEST:
      return { loading: true };
    case DELETE_TALENT_BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        talentProfile: action.payload,
      };
    case DELETE_TALENT_BIDS_FAILED:
      return { loading: false, error: action.payload };

    case TALENT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
