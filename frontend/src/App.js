import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/HomeScreen";
import About from "./Screens/AboutScreen";
import Footer from "./components/Footer";
import Login from "./Screens/LoginScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Register from "./Screens/RegisterScreen";
import PostScreen from "./Screens/PostScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetailsScreen from "./Screens/PostDetailsScreen";
import TalentDashboard from "./Screens/TalentDashboard";
import EmployerDashboard from "./Screens/EmployerDashboard";
import TalentEditScreen from "./Screens/TalentEditScreen";
import PostJob from "./Screens/PostJob";
import EmployeeRegistrationScreen from "./Screens/EmployeeReg";
import EmployerEdit from "./Screens/EmployerEdit";
import TalentRegForm from "./Screens/TalentRegForm";
import { useSelector } from "react-redux";

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <ToastContainer autoClose={1000} hideProgressBar={true} />

        <Routes>
          <Route
            path="/talentDashboard/:userTalentId"
            element={<TalentDashboard />}
          />
          <Route path="/talentReg" element={<TalentRegForm />} />
          <Route path="/talentEdit" element={<TalentEditScreen />} />

          <Route path="/employerEdit" element={<EmployerEdit />} />
          <Route
            path="/employerDashboard/:userEmployerId"
            element={<EmployerDashboard />}
          />
          <Route path="/postJob" element={<PostJob />} />
          <Route path="/postJob/edit" element={<PostJob />} />
          <Route path="/employerReg" element={<EmployeeRegistrationScreen />} />

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/projects/:category" element={<PostScreen />} />
          <Route path="/project/:postId" element={<PostDetailsScreen />} />
          <Route path="/project/edit/:postId" element={<PostDetailsScreen />} />
          <Route
            path="/projects/:category/search/:keyword"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/price/:price"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/experience/:experiencedLevel"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/search/:keyword/price/:price"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/price/:price/experience/:experiencedLevel"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/search/:keyword/experience/:experiencedLevel"
            element={<PostScreen />}
          />
          <Route
            path="/projects/:category/search/:keyword/price/:price/experience/:experiencedLevel"
            element={<PostScreen />}
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};
