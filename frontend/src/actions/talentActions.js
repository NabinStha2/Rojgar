import { toast } from "react-toastify";
import axios from "../api/axios";
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
  EDIT_TALENT_REQUEST,
  EDIT_TALENT_SUCCESS,
  GET_TALENT_PROFILE_FAILED,
  GET_TALENT_PROFILE_REQUEST,
  GET_TALENT_PROFILE_SUCCESS,
  TALENT_REGISTRATION_FAILED,
  TALENT_REGISTRATION_REQUEST,
  TALENT_REGISTRATION_SUCCESS,
  EDIT_TALENT_RATING_REQUEST,
  EDIT_TALENT_RATING_SUCCESS,
  EDIT_TALENT_RATING_FAILED,
  GET_ALL_TALENT_REQUEST,
  GET_ALL_TALENT_SUCCESS,
  GET_ALL_TALENT_FAILED,
} from "../constants/talentConstant";
import { getPostDetailsAction } from "./postActions";

export const registerTalentAction =
  ({ id }, formData, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TALENT_REGISTRATION_REQUEST,
      });

      const { data } = await axios.post(`/talent/register/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //   console.log(data.talentProfile);

      dispatch({
        type: TALENT_REGISTRATION_SUCCESS,
        payload: data.talentProfile,
      });

      navigate(`/talentDashboard/${data.talentProfile.userTalentId}`);
    } catch (err) {
      console.log(err.message);
      console.log(err.response.data.errMessage);
      dispatch({
        type: TALENT_REGISTRATION_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getAllTalentAction =
  ({ inputData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_TALENT_REQUEST,
      });

      const { data } = await axios.get("/talent", {
        params: {
          keyword: inputData.keyword,
          experiencedLevel: inputData.experiencedLevel,
          category: inputData.category,
          skills: inputData.skills.join(","),
        },
      });

      console.log(data);

      dispatch({
        type: GET_ALL_TALENT_SUCCESS,
        payload: data.talentProfile,
      });
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_ALL_TALENT_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getTalentProfileByUserTalentIdAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_TALENT_PROFILE_REQUEST,
      });

      const { data } = await axios.get(`/talent/userTalentId/${id}`);

      //   console.log(data);

      dispatch({
        type: GET_TALENT_PROFILE_SUCCESS,
        payload: data.talentProfile,
      });
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_TALENT_PROFILE_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const editTalentAction =
  ({ userTalentId, id }, formData, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_TALENT_REQUEST,
      });

      const { data } = await axios.patch(`/talent/editTalent/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(data);

      dispatch({
        type: EDIT_TALENT_SUCCESS,
        payload: data.talentProfile,
      });
      toast("Talent edited successfully.Go back");
      // console.log(userTalentId);

      // navigate(`/talentDashboard/${userTalentId}`);
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: EDIT_TALENT_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const editTalentRatingAction =
  ({ userTalentId, inputData, id, visit = false }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_TALENT_RATING_REQUEST,
      });

      const { data } = await axios.patch(
        `/talent/editTalentRating/${id}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: EDIT_TALENT_RATING_SUCCESS,
        payload: data.talentProfile,
      });
      toast("talent rating edited successfully");
      // console.log(userTalentId);

      console.log(visit);

      visit
        ? navigate(`/talentProfile/${userTalentId}`)
        : navigate(`/talentDashboard/${userTalentId}`);
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: EDIT_TALENT_RATING_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const createTalentBidsAction =
  ({ id, inputData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_TALENT_BIDS_REQUEST,
      });

      const { data } = await axios.patch(
        `/talent/bidsCreate/${id}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: CREATE_TALENT_BIDS_SUCCESS,
        payload: data.talentProfile,
      });
      dispatch(getPostDetailsAction({ id: inputData.postId }));
      toast("Bids applied successfully");
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: CREATE_TALENT_BIDS_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const editTalentBidsAction =
  ({ id, inputData }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_TALENT_BIDS_REQUEST,
      });

      const { data } = await axios.patch(`/talent/bidsEdit/${id}`, inputData, {
        headers: {
          "content-type": "application/json",
        },
      });

      // console.log(data);

      dispatch({
        type: EDIT_TALENT_BIDS_SUCCESS,
        payload: data.talentProfile,
      });
      dispatch(getPostDetailsAction({ id: inputData.postId }));
      toast("Bids edited successfully");
    } catch (err) {
      console.log(err.message);
      console.log(err.response.data.errMessage);
      dispatch({
        type: EDIT_TALENT_BIDS_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const deleteTalentBidsAction =
  ({ id, postId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_TALENT_BIDS_REQUEST,
      });

      const { data } = await axios.patch(
        `/talent/bidsDelete/${id}`,
        { postId },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: DELETE_TALENT_BIDS_SUCCESS,
        payload: data.talentProfile,
      });
      dispatch(getPostDetailsAction({ id: postId }));
      toast("Bids deleted successfully");
    } catch (err) {
      console.log(err.message);
      console.log(err.response.data.errMessage);
      dispatch({
        type: DELETE_TALENT_BIDS_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };
