import { toast } from "react-toastify";
import {
  EMPLOYER_REGISTRATION_FAILED,
  EMPLOYER_REGISTRATION_REQUEST,
  EMPLOYER_REGISTRATION_SUCCESS,
  GET_EMPLOYER_PROFILE_REQUEST,
  GET_EMPLOYER_PROFILE_FAILED,
  GET_EMPLOYER_PROFILE_SUCCESS,
  EDIT_EMPLOYER_FAILED,
  EDIT_EMPLOYER_REQUEST,
  EDIT_EMPLOYER_SUCCESS,
  EDIT_EMPLOYER_RATING_REQUEST,
  EDIT_EMPLOYER_RATING_SUCCESS,
  EDIT_EMPLOYER_RATING_FAILED,
  GET_ALL_EMPLOYER_REQUEST,
  GET_ALL_EMPLOYER_FAILED,
  GET_ALL_EMPLOYER_SUCCESS,
} from "../constants/employerConstant";
import rojgarAxios from "../api/axios";

export const registerEmployerAction =
  ({ id }, formData, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYER_REGISTRATION_REQUEST,
      });

      const { data } = await rojgarAxios.post(
        `/employer/register/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //   console.log(data.employerProfile);

      dispatch({
        type: EMPLOYER_REGISTRATION_SUCCESS,
        payload: data.employerProfile,
      });

      navigate(`/employerDashboard/${data.employerProfile.userEmployerId}`);
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: EMPLOYER_REGISTRATION_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getAllEmployerAction =
  ({ inputData, pageNumber }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_EMPLOYER_REQUEST,
      });

      const { data } = await rojgarAxios.get("/employer", {
        params: {
          keyword: inputData.keyword,
          email: inputData.email,
          pageNumber,
        },
      });

      console.log(data);

      dispatch({
        type: GET_ALL_EMPLOYER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_ALL_EMPLOYER_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const getEmployerProfileByEmployerIdAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_EMPLOYER_PROFILE_REQUEST,
      });

      const { data } = await rojgarAxios.get(`/employer/userEmployerId/${id}`);

      // console.log(data);

      dispatch({
        type: GET_EMPLOYER_PROFILE_SUCCESS,
        payload: data.employerProfile,
      });
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: GET_EMPLOYER_PROFILE_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const editEmployerAction =
  ({ userEmployerId, id }, formData, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_EMPLOYER_REQUEST,
      });

      const { data } = await rojgarAxios.post(
        `/employer/editemployer/${id}`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      dispatch({
        type: EDIT_EMPLOYER_SUCCESS,
        payload: data.employerProfile,
      });
      toast("Employer edited successfully.Go back");
      // console.log(userEmployerId);

      // navigate(`/employerDashboard/${userEmployerId}`);
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: EDIT_EMPLOYER_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const uploadImageAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_EMPLOYER_REQUEST,
    });

    const { data } = await rojgarAxios.post("/api/upload", formData, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    console.log(data);

    // dispatch({
    //   type: EDIT_EMPLOYER_SUCCESS,
    //   payload: data.employerProfile,
    // });
    toast("Image Uploaded successfully");
  } catch (err) {
    console.log(err.message);
    // console.log(err.response.data.errMessage);
    dispatch({
      type: EDIT_EMPLOYER_FAILED,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    });
  }
};
export const editEmployerRatingAction =
  ({ userEmployerId, inputData, id, visit = false }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_EMPLOYER_RATING_REQUEST,
      });

      const { data } = await rojgarAxios.patch(
        `/employer/editemployerrating/${id}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: EDIT_EMPLOYER_RATING_SUCCESS,
        payload: data.employerProfile,
      });
      toast("Employer edited successfully");
      // console.log(userEmployerId);

      visit
        ? navigate(`/employerProfile/${userEmployerId}`)
        : navigate(`/employerDashboard/${userEmployerId}`);
    } catch (err) {
      console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: EDIT_EMPLOYER_RATING_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };
