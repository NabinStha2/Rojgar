import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Grid,
  Grow,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Paper,
  InputAdornment,
  CircularProgress,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "30px 0px",
    padding: "10px",
    width: "100%",
  },
  root: {
    justifyContent: "center",
    flexDirection: "column !important",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    flex: "1",
    fontSize: "3rem",
    fontWeight: "normal",
    color: "grey",
    "&:hover": {
      color: "rgba(117,81,159,1)",
    },
  },
  form: {
    flex: "1",
  },
  radio: {
    display: "flex",
    flex: "1",
    justifyContent: "start",
  },
  name: {
    display: "inline-flex",
  },
  textField: {
    width: "100%",
    margin: "10px 0px !important",
  },
  button: {
    width: "100%",
    margin: "15px 0px !important",
  },
  checkbox: {},
}));

const RegisterScreen = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [value, setValue] = useState("Talent");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, verifyMessage } = userRegister;

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(data);

    if (
      data.email !== "" &&
      data.password !== "" &&
      data.firstName !== "" &&
      data.lastName !== "" &&
      data.confirmPassword !== ""
    ) {
      if (data.password !== data.confirmPassword) {
        setMessage("password and confirmPassword do not match");
        console.log(message);
      } else {
        let name = data.firstName + " " + data.lastName;
        // console.log(name);
        dispatch(
          userRegisterAction(name, data.email, data.password, value, navigate)
        );
      }
    } else {
      setMessage("All field must be filled!!!");
      console.log(message);
    }
  };

  const handleShowPassword = () => {
    // console.log(showPassword);
    setShowPassword(!showPassword);
  };

  const handleShowSignUp = () => {
    // console.log(showSignUp);
    setShowSignUp(!showSignUp);
  };

  return (
    <Grow in>
      <Container maxWidth="md">
        <Paper elevation={6} className={classes.main} variant="elevation">
          <Grid container className={classes.root}>
            <Grid item className={classes.heading}>
              Register
            </Grid>
            {message && <AlertMessage severity="error" message={message} />}
            {error && <AlertMessage severity="error" message={error} />}
            {verifyMessage && (
              <AlertMessage severity="info" message={verifyMessage} />
            )}
            <Grid item className={classes.radio}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Sign Up As</FormLabel>
                <RadioGroup
                  row
                  aria-label="Sign Up As"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Employer"
                    control={<Radio />}
                    label="Buyer(Hire)"
                  />
                  <FormControlLabel
                    value="Talent"
                    control={<Radio />}
                    label="Provider(Work)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container item>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container item className={classes.name} spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.textField}
                      type="text"
                      name="firstName"
                      label="First Name"
                      variant="standard"
                      value={data.firstName}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.textField}
                      type="text"
                      name="lastName"
                      label="Last Name"
                      variant="standard"
                      value={data.lastName}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    type="text"
                    name="email"
                    label="E-mail"
                    variant="standard"
                    fullWidth
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid container item direction="row" spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      variant="standard"
                      helperText="Password must have at least 6 character"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="button"
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      label="Confirm Password"
                      variant="standard"
                      fullWidth
                      value={data.confirmPassword}
                      onChange={(e) =>
                        setData({ ...data, confirmPassword: e.target.value })
                      }
                      helperText="Password must have at least 6 character"
                    />
                  </Grid>
                </Grid>

                <Grid item className={classes.checkbox}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      onChange={handleShowSignUp}
                      label="By creating an account, you are agreeing to our Terms and Conditions and our Privacy Policy."
                      sx={{
                        "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
                          {
                            color: purple[800],
                          },
                      }}
                    />
                  </FormGroup>
                </Grid>
                <Button
                  className={classes.button}
                  disabled={showSignUp ? false : true}
                  sx={
                    showSignUp
                      ? { backgroundColor: "goldenrod !important" }
                      : null
                  }
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress size={30} />
                    </Box>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grow>
  );
};

export default RegisterScreen;
