import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";
// import { getEmployerProfileByEmployerIdAction } from "./employerActions";
import { EMPLOYER_DETAILS_RESET } from "../constants/employerConstant";
import { TALENT_DETAILS_RESET } from "../constants/talentConstant";
// import { getTalentProfileByUserTalentIdAction } from "./talentActions";

export const userLoginAction =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // if (data.userProfile.jobType === "Employer") {
      //   dispatch(
      //     getEmployerProfileByEmployerIdAction({
      //       id: data.userProfile._id,
      //     })
      //   );
      // } else {
      //   dispatch(
      //     getTalentProfileByUserTalentIdAction({
      //       id: data.userProfile._id,
      //     })
      //   );
      // }

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
  localStorage.removeItem("userInfo");
  localStorage.removeItem("isEmployerProfileComplete");
  localStorage.removeItem("isTalentProfileComplete");
};
