import { useState } from "react";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../actions/userActions";
import { categoriesAvailable } from "../App";
import RojgarLogo from "../assets/images/rojgarlogo.png";
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
        <Navbar.Brand
          href="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{ width: "100%", height: "auto", maxWidth: "50px" }}
            src={RojgarLogo}
          />
          <h2 style={{ color: "white" }}>ojgar</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={location.pathname}>
            {!userInfo && (
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
            )}
            {userInfo && userInfo.jobType === "Employer" && (
              <Nav.Item>
                <Nav.Link
                  href={
                    userInfo.isComplete && `/employerDashboard/${userInfo._id}`
                  }
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
            )}
            {userInfo && userInfo.jobType === "Talent" && (
              <Nav.Item>
                <Nav.Link
                  href={
                    userInfo.isComplete && `/talentDashboard/${userInfo._id}`
                  }
                >
                  Dashboard
                </Nav.Link>
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
                    <NavDropdown.Item
                      key={i}
                      href={`/projects/${category.value}`}
                    >
                      {category.name}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                );
              })}
            </NavDropdown>

            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            {userInfo ? (
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
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
