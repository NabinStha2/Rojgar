import {
  GET_ADVANCED_POST_FAILED,
  GET_ADVANCED_POST_REQUEST,
  GET_ADVANCED_POST_SUCCESS,
  GET_ALL_POST_FAILED,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_CATEGORY_POST_FAILED,
  GET_CATEGORY_POST_REQUEST,
  GET_CATEGORY_POST_SUCCESS,
  GET_POST_DETAILS_FAILED,
  GET_POST_DETAILS_REQUEST,
  GET_POST_DETAILS_SUCCESS,
  POST_ACCEPT_PROPOSAL_FAILED,
  POST_ACCEPT_PROPOSAL_REQUEST,
  POST_ACCEPT_PROPOSAL_SUCCESS,
  POST_CREATE_FAILED,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILED,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_EDIT_FAILED,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_FINISH_PROPOSAL_FAILED,
  POST_FINISH_PROPOSAL_REQUEST,
  POST_FINISH_PROPOSAL_SUCCESS,
  POST_PAID_PROPOSAL_FAILED,
  POST_PAID_PROPOSAL_REQUEST,
  POST_PAID_PROPOSAL_SUCCESS,
} from "../constants/postConstant";

export const getPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_ALL_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_ALL_POST_FAILED:
      return { loading: false, error: action.payload };

    case GET_ADVANCED_POST_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_ADVANCED_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_ADVANCED_POST_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_CATEGORY_POST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_CATEGORY_POST_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_CATEGORY_POST_FAILED:
      return { ...state, loading: false, error: action.payload };

    case GET_POST_DETAILS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_POST_DETAILS_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case GET_POST_DETAILS_FAILED:
      return { ...state, loading: false, error: action.payload };

    case POST_CREATE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case POST_CREATE_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case POST_CREATE_FAILED:
      return { ...state, loading: false, error: action.payload };

    case POST_EDIT_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case POST_EDIT_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case POST_EDIT_FAILED:
      return { ...state, loading: false, error: action.payload };

    case POST_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        post: action.payload.projectPost,
      };
    case POST_DELETE_FAILED:
      return { loading: false, error: action.payload };

    case POST_PAID_PROPOSAL_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case POST_PAID_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload.projectPost,
      };
    case POST_PAID_PROPOSAL_FAILED:
      return { ...state, loading: false, error: action.payload };

    case POST_ACCEPT_PROPOSAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_ACCEPT_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload.projectPost,
      };
    case POST_ACCEPT_PROPOSAL_FAILED:
      return { loading: false, error: action.payload };

    case POST_FINISH_PROPOSAL_REQUEST:
      return { ...state, error: null, loading: true };
    case POST_FINISH_PROPOSAL_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload.projectPost,
      };
    case POST_FINISH_PROPOSAL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
