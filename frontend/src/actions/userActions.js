import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESETPW_FAILED,
  USER_RESETPW_REQUEST,
  USER_RESETPW_SUCCESS,
  USER_VERIFY_OTP_FAILED,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";
// import { getEmployerProfileByEmployerIdAction } from "./employerActions";
import { EMPLOYER_DETAILS_RESET } from "../constants/employerConstant";
import { TALENT_DETAILS_RESET } from "../constants/talentConstant";
import { toast } from "react-toastify";
// import { getTalentProfileByUserTalentIdAction } from "./talentActions";

export const userLoginAction =
  (email, password, updatePW, navigate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        { email, password, updatePW },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.userProfile,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.userProfile));
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.errMessage);
      dispatch({
        type: USER_LOGIN_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const userResetPWAction = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_RESETPW_REQUEST,
    });

    const { data } = await axios.post(
      "http://localhost:5000/user/sendOTP",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(data);

    dispatch({
      type: USER_RESETPW_SUCCESS,
      payload: data.userId,
    });
    toast(data.OTPMessage);
  } catch (err) {
    // console.log(err.message);
    // console.log(err.response.data.OTPMessage);
    dispatch({
      type: USER_RESETPW_FAILED,
      payload:
        err.response && err.response.data.OTPMessage
          ? err.response.data.OTPMessage
          : err.message,
    });
  }
};
export const userOTPVerifyAction =
  (otp, userId, navigate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_VERIFY_OTP_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/user/verify-OTP",
        { otp, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);

      dispatch({
        type: USER_VERIFY_OTP_SUCCESS,
        payload: true,
      });
      toast(data.OTPMessage);
    } catch (err) {
      // console.log(err.message);
      // console.log(err.response.data.OTPMessage);
      dispatch({
        type: USER_VERIFY_OTP_FAILED,
        payload:
          err.response && err.response.data.OTPMessage
            ? err.response.data.OTPMessage
            : err.message,
      });
    }
  };

export const userRegisterAction =
  (name, email, password, jobType, navigate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/user/register",
        { name, email, password, jobType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(data);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // navigate("/login");
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: USER_REGISTER_FAILED,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      });
    }
  };

export const userLogoutAction = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: EMPLOYER_DETAILS_RESET,
  });
  dispatch({
    type: TALENT_DETAILS_RESET,
  });
  console.log("logout");
  localStorage.removeItem("userInfo");

  // localStorage.removeItem("isEmployerProfileComplete");
  // localStorage.removeItem("isTalentProfileComplete");
};
