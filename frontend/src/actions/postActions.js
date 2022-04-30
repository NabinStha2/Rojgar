import rojgarAxios from "../api/axios";
import { toast } from "react-toastify";
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
  POST_CREATE_FAILED,
  POST_ACCEPT_PROPOSAL_REQUEST,
  POST_ACCEPT_PROPOSAL_SUCCESS,
  POST_ACCEPT_PROPOSAL_FAILED,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILED,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_EDIT_FAILED,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_PAID_PROPOSAL_REQUEST,
  POST_PAID_PROPOSAL_SUCCESS,
  POST_PAID_PROPOSAL_FAILED,
} from "../constants/postConstant";

export const getAllPostAction =
  ({ inputData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_POST_REQUEST,
      });
      const { data } = await rojgarAxios.get(`/post/projects`, {
        params: {
          keyword: inputData.keyword,
          experiencedLevel: inputData.experiencedLevel,
          price: inputData.price,
          skills: inputData.skillsRequirement.join(","),
        },
      });
      // console.log(data);
      dispatch({
        type: GET_ALL_POST_SUCCESS,
        payload: data.posts,
      });
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_ALL_POST_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getAdvancedPostAction =
  ({ inputData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ADVANCED_POST_REQUEST,
      });
      const { data } = await rojgarAxios.get(
        `/post/advanceSearch/projects/${inputData.category}`,
        {
          params: {
            keyword: inputData.keyword,
            experiencedLevel: inputData.experiencedLevel,
            price: inputData.price,
            skills: inputData.skillsRequirement.join(","),
          },
        }
      );
      // console.log(data);
      dispatch({
        type: GET_ADVANCED_POST_SUCCESS,
        payload: data.posts,
      });
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_ADVANCED_POST_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getCategoryPostAction =
  ({ category }) =>
  async (dispatch, getState) => {
    try {
      //   console.log(category);
      dispatch({
        type: GET_CATEGORY_POST_REQUEST,
      });
      const { data } = await rojgarAxios.get(
        `/post/categorySearch/projects/${category}`
      );
      //   console.log(data);
      dispatch({
        type: GET_CATEGORY_POST_SUCCESS,
        payload: data.posts,
      });
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_CATEGORY_POST_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getPostDetailsAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      //   console.log(id);
      dispatch({
        type: GET_POST_DETAILS_REQUEST,
      });
      const { data } = await rojgarAxios.get(`/post/project/${id}`);
      // console.log(data);
      dispatch({
        type: GET_POST_DETAILS_SUCCESS,
        payload: data.projectPost,
      });
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_POST_DETAILS_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postCreateAction =
  ({ inputData, id }, navigate) =>
  async (dispatch, getState) => {
    console.log(id);
    try {
      //   console.log(id);
      dispatch({
        type: POST_CREATE_REQUEST,
      });
      const { data } = await rojgarAxios.post(
        `/post/addProject/${id}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log(data);
      dispatch({
        type: POST_CREATE_SUCCESS,
        payload: data.projectPost,
      });

      toast("Post created successfully");

      navigate(
        `/employerDashboard/${data.projectPost.employerId.userEmployerId}`
      );
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: POST_CREATE_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postEditAction =
  ({ inputData, postId }, navigate) =>
  async (dispatch, getState) => {
    console.log(postId);
    try {
      dispatch({
        type: POST_EDIT_REQUEST,
      });
      const { data } = await rojgarAxios.patch(
        `/post/project/${postId}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log(data);
      dispatch({
        type: POST_EDIT_SUCCESS,
        payload: data.projectPost,
      });

      // navigate(
      //   `/employerDashboard/${data.projectPost.employerId.userEmployerId}`
      // );
      navigate(`/project/edit/${data.projectPost._id}`);
    } catch (err) {
      dispatch({
        type: POST_EDIT_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postDeleteAction =
  ({ id }, navigate) =>
  async (dispatch, getState) => {
    console.log(id);
    try {
      dispatch({
        type: POST_DELETE_REQUEST,
      });
      const { data } = await rojgarAxios.delete(`/post/project/${id}`);
      // console.log(data);
      dispatch({
        type: POST_DELETE_SUCCESS,
        payload: data,
      });

      navigate(
        `/employerDashboard/${data.projectPost.employerId.userEmployerId}`
      );
    } catch (err) {
      dispatch({
        type: POST_DELETE_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postPaidProposalAction =
  ({ postId }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_PAID_PROPOSAL_REQUEST,
      });
      const { data } = await rojgarAxios.patch(
        `/post/projectPaidProposal/${postId}`
      );
      console.log(data);
      dispatch({
        type: POST_PAID_PROPOSAL_SUCCESS,
        payload: data,
      });
      // dispatch(getPostDetailsAction({ id: postId }));
      // navigate(`/project/edit/${postId}`);
    } catch (err) {
      console.log(err.response.data.errMessage);
      dispatch({
        type: POST_PAID_PROPOSAL_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postAcceptProposalAction =
  ({ postId, talentId }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_ACCEPT_PROPOSAL_REQUEST,
      });
      const { data } = await rojgarAxios.patch(
        `/post/projectAcceptProposal/${postId}`,
        { talentId: talentId }
      );
      console.log(data);
      dispatch({
        type: POST_ACCEPT_PROPOSAL_SUCCESS,
        payload: data,
      });
      // dispatch(getPostDetailsAction({ id: postId }));
      navigate(`/project/edit/${postId}`);
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: POST_ACCEPT_PROPOSAL_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const postFinishProposalAction =
  ({ postId, talentId }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_ACCEPT_PROPOSAL_REQUEST,
      });
      const { data } = await rojgarAxios.patch(
        `/post/projectFinishProposal/${postId}`,
        { talentId: talentId }
      );
      console.log(data);
      dispatch({
        type: POST_ACCEPT_PROPOSAL_SUCCESS,
        payload: data,
      });
      // dispatch(getPostDetailsAction({ id: postId }));
      navigate(`/project/edit/${postId}`);
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: POST_ACCEPT_PROPOSAL_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };
