import React from "react";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import rojgarAxios from "./api/axios";
import jwt_decode from "jwt-decode";
import RefreshApi from "./api/refreshApi";
import { userLogoutAction } from "./actions/userActions";

const Home = React.lazy(() => import("./Screens/HomeScreen"));
const About = React.lazy(() => import("./Screens/AboutScreen"));
const Footer = React.lazy(() => import("./components/Footer"));
const Login = React.lazy(() => import("./Screens/LoginScreen"));
const Register = React.lazy(() => import("./Screens/RegisterScreen"));
const TabsScreen = React.lazy(() => import("./Screens/TabsScreen"));
const TalentDashboard = React.lazy(() => import("./Screens/TalentDashboard"));
const EmployerDashboard = React.lazy(() =>
  import("./Screens/EmployerDashboard")
);
const TalentEditScreen = React.lazy(() => import("./Screens/TalentEditScreen"));
const EmployeeRegistrationScreen = React.lazy(() =>
  import("./Screens/EmployeeReg")
);
const EmployerEdit = React.lazy(() => import("./Screens/EmployerEdit"));
const TalentRegForm = React.lazy(() => import("./Screens/TalentRegForm"));
const PostJob = React.lazy(() => import("./Screens/PostJob"));
const PostDetailsScreen = React.lazy(() =>
  import("./Screens/PostDetailsScreen")
);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const skillsAvailable = [
  "ReactJs",
  "NodeJs",
  "Html",
  "Css",
  "Flutter",
  "Javascript",
  "Java",
  "Python",
  "PHP",
  "MySQL",
  "React native",
  "Swift",
  "Adobe XD",
  "Figma",
  "Knit master",
  "Premier pro",
  "Adobe illustrator",
  "Adobe photoshop",
  "Kotlin",
  "Angular",
  "Vue.js",
  "svelte.js",
  "Ruby",
];

export const categoriesAvailable = [
  { name: "Web Development", value: "webdevelopment" },
  { name: "Mobile Development", value: "mobiledevelopment" },
  { name: "UI/UX Design", value: "uiuxdesign" },
  { name: "Video Editing", value: "videoediting" },
  { name: "Writing Editing", value: "writing" },
  { name: "Graphic Designer", value: "graphicdesigner" },
];

export const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  if (userInfo) {
    rojgarAxios.interceptors.request.use(
      async (config) => {
        // console.log("axios interceptors");

        const now = Math.ceil(Date.now() / 1000);

        const decodedAccessToken = jwt_decode(
          JSON.parse(localStorage.getItem("userInfo")).accessToken
        );
        const decodedRefreshToken = jwt_decode(
          JSON.parse(localStorage.getItem("userInfo")).refreshToken
        );
        console.log(
          "decoded Access token: " + decodedAccessToken.exp,
          "decoded Refresh token: " + decodedRefreshToken.exp,
          "now: " + now
        );

        if (decodedRefreshToken.exp < now) {
          console.log("Refresh token is expired", decodedRefreshToken.exp, now);

          dispatch(userLogoutAction());
          window.location.href = "/login/";
          toast("Refresh token is expired");
        }

        if (decodedAccessToken.exp < now) {
          console.log(
            "decoded token: " + decodedAccessToken.exp,
            "now: " + now
          );
          console.log("Before: ", userInfo.accessToken);
          const data = await RefreshApi({
            refreshToken: userInfo.refreshToken,
          });

          // console.log(data);

          console.log("newAccessToken: ", data.userProfile.accessToken);
          // console.log(
          //   "local: ",
          //   JSON.parse(localStorage.getItem("userInfo")).accessToken
          // );
        }
        config.headers["Authorization"] =
          "Bearer " + JSON.parse(localStorage.getItem("userInfo")).accessToken;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     rojgarAxios.defaults.headers.common["Authorization"] =
  //       "Bearer " + userInfo.accessToken;
  //   }
  // }, [userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Header />
          <ToastContainer autoClose={1000} hideProgressBar={true} />

          <Routes>
            <Route
              path="/talentProfile/:userTalentId"
              element={<TalentDashboard visit={true} />}
            />

            <Route
              path="/employerProfile/:userEmployerId"
              element={<EmployerDashboard visit={true} />}
            />

            <Route path="/project/:postId" element={<PostDetailsScreen />} />

            {userInfo && userInfo.jobType === "Talent" && (
              <>
                {!userInfo.isComplete && (
                  <Route path="/talentReg" element={<TalentRegForm />} />
                )}
                <Route path="/talentEdit" element={<TalentEditScreen />} />

                <Route
                  path="/project/:postId"
                  element={<PostDetailsScreen />}
                />
              </>
            )}

            {userInfo && userInfo.jobType === "Employer" && (
              <>
                {!userInfo.isComplete && (
                  <Route
                    path="/employerReg"
                    element={<EmployeeRegistrationScreen />}
                  />
                )}
                <Route path="/employerEdit" element={<EmployerEdit />} />
                <Route path="/postJob" element={<PostJob />} />
                <Route path="/postJob/edit" element={<PostJob />} />
                <Route
                  path="/project/:postId"
                  element={<PostDetailsScreen />}
                />
                <Route
                  path="/project/edit/:postId"
                  element={<PostDetailsScreen />}
                />
              </>
            )}

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            <Route path="/" element={<Home />} />

            {userInfo ? (
              userInfo.jobType === "Employer" ? (
                <Route
                  path="/employerDashboard/:userEmployerId"
                  element={<EmployerDashboard />}
                />
              ) : (
                <Route
                  path="/talentDashboard/:userTalentId"
                  element={<TalentDashboard />}
                />
              )
            ) : (
              <Route path="/" element={<Home />} />
            )}

            <Route path="/about" element={<About />} />

            <Route
              path="/projects/:category/page/:pageNumber"
              element={<TabsScreen index={0} />}
            />

            <Route
              path="/freelancer/page/:pageNumber"
              element={<TabsScreen index={1} />}
            />
            <Route
              path="/employerList/page/:pageNumber"
              element={<TabsScreen index={2} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/search/:keyword"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/price/:price"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/experience/:experiencedLevel"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/search/:keyword/price/:price"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/price/:price/experience/:experiencedLevel"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/search/:keyword/experience/:experiencedLevel"
              element={<TabsScreen index={0} />}
            />
            <Route
              path="/projects/:category/page/:pageNumber/search/:keyword/price/:price/experience/:experiencedLevel"
              element={<TabsScreen index={0} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
};
