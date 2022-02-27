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
} from "../constants/employerConstant";
import axios from "../api/axios";

export const registerEmployerAction =
  ({ inputData, id }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYER_REGISTRATION_REQUEST,
      });

      const { data } = await axios.post(`/employer/register/${id}`, inputData, {
        headers: {
          "content-type": "application/json",
        },
      });

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

export const getEmployerProfileByEmployerIdAction =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_EMPLOYER_PROFILE_REQUEST,
      });

      const { data } = await axios.get(`/employer/userEmployerId/${id}`);

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
  ({ userEmployerId, inputData, id }, navigate) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_EMPLOYER_REQUEST,
      });

      const { data } = await axios.put(
        `/employer/editemployer/${id}`,
        inputData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: EDIT_EMPLOYER_SUCCESS,
        payload: data.employerProfile,
      });
      toast("Employer edited successfully");
      // console.log(userEmployerId);

      navigate(`/employerDashboard/${userEmployerId}`);
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
