import axios from "axios";

const RefreshApi = async ({ refreshToken }) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/user/refreshToken",
      {
        token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(res.data);

    localStorage.setItem("userInfo", JSON.stringify(res.data.userProfile));

    // console.log(JSON.parse(localStorage.getItem("userInfo")).accessToken);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default RefreshApi;
