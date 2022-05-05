import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import { categoriesAvailable } from "../App";
import RojgarLogo from "../assets/images/rojgarlogo.png";
import { Button } from "react-bootstrap";
// import {
//   AppBar,
//   Box,
//   Button,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     display: "flex",
//     flexDirection: "row",
//   },
// }));

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  // const { employerProfile } = useSelector((state) => state.employerInfo);
  const { userInfo } = userLogin;

  // console.log(employerProfile);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        {/* <Navbar.Brand
        > */}
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            textDecoration: "none",
          }}
        >
          <Image
            style={{ width: "100%", height: "auto", maxWidth: "50px" }}
            src={RojgarLogo}
          />
          <h2 style={{ color: "white" }}>ojgar</h2>
        </Link>
        {/* </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={location.pathname}>
            {!userInfo && (
              <Nav.Item>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to="/"
                >
                  Home
                </Link>
              </Nav.Item>
            )}
            {userInfo && userInfo.jobType === "Employer" && (
              <Nav.Item>
                <Link
                  to={
                    userInfo.isComplete && `/employerDashboard/${userInfo._id}`
                  }
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
              </Nav.Item>
            )}
            {userInfo && userInfo.jobType === "Talent" && (
              <Nav.Item>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                  to={userInfo.isComplete && `/talentDashboard/${userInfo._id}`}
                >
                  Dashboard
                </Link>
              </Nav.Item>
            )}

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Category"
              menuVariant="dark"
            >
              {categoriesAvailable.map((category, i) => {
                return (
                  <>
                    <NavDropdown.Item key={i}>
                      <Link
                        to={`/projects/${category.value}/page/${1}`}
                        state={{ callOnSubmit: false }}
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        {category.name}
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                  </>
                );
              })}
            </NavDropdown>

            <Nav.Item>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/about"
              >
                About
              </Link>
            </Nav.Item>

            {userInfo ? (
              <Nav.Item>
                <Button
                  variant="text"
                  style={{ color: "white", width: "100%", fontWeight: "500" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
