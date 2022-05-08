import {
  Grid,
  Grow,
  TextField,
  Container,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { useDispatch, useSelector } from "react-redux"
import {
  userLoginAction,
  userOTPVerifyAction,
  userResetPWAction,
} from "../actions/userActions"
import AlertMessage from "../components/Alert"

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex !important",
    justifyContent: "center",
  },
  main: {
    margin: "30px 0px",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  root: {
    flexDirection: "column !important",
    justifyContent: "center",
    alignItems: "center",
    padding: "18px 20px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "18px 10px !important",
    },
  },
  label: {
    // flexDirection: "column !important",
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
  },
  textField: {
    width: "100%",
    margin: "10px 0px !important",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "normal",
    color: "rgba(117,81,159,1)",
  },
  button: {
    width: "100%",
    margin: "5px 0px !important",
  },
  signup: {
    margin: "20px 0px !important",
    textDecoration: "none",
  },
}))

const LoginScreen = () => {
  const classes = useStyles()
  const [data, setData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [forgetPW, setForgetPW] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null)
  const [sendOTP, setSendOTP] = useState(false)
  const [newPW, setNewPW] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { employerProfile } = useSelector(state => state.employerInfo)
  const { talentProfile } = useSelector(state => state.talentInfo)
  const { userInfo, userId, loading, error } = userLogin

  const handleSubmit = e => {
    e.preventDefault()

    // console.log(data);
    // console.log(userId, verified);
    if (data.otp !== "" && sendOTP) {
      dispatch(userOTPVerifyAction(data.otp, userId))
      console.log("hahahaaaaaaaaaa")
      setSendOTP(false)
      setForgetPW(false)
      setNewPW(true)
    } else if (data.email !== "" && data.otp === "" && forgetPW) {
      dispatch(userResetPWAction(data.email))
      setSendOTP(true)
    } else if (data.email !== "" && data.password !== "") {
      if (newPW) {
        dispatch(userLoginAction(data.email, data.password, true, navigate))
      } else {
        console.log("hahahah")
        dispatch(userLoginAction(data.email, data.password, false, navigate))
      }
    } else {
      setMessage("All field must be filled!!!")
      console.log(message)
    }
  }

  const handleShowPassword = () => {
    // console.log(showPassword);
    setShowPassword(!showPassword)
  }
  // console.log(message);

  useEffect(() => {
    // console.log("login");

    if (
      userInfo &&
      userInfo.jobType === "admin"
    ) {
      console.log("login");
      navigate(`/admin`);
    }
    if (
      userInfo &&
      userInfo.jobType === "Employer" &&
      userInfo.isComplete === true
    ) {
      console.log("login")
      navigate(`/employerDashboard/${userInfo._id}`)
    }
    if (
      userInfo &&
      userInfo.jobType === "Employer" &&
      userInfo.isComplete === false
    ) {
      navigate("/employerReg")
    }
    if (
      userInfo &&
      userInfo.jobType === "Talent" &&
      userInfo.isComplete === true
    ) {
      navigate(`/talentDashboard/${userInfo._id}`)
    }
    if (
      userInfo &&
      userInfo.jobType === "Talent" &&
      userInfo.isComplete === false
    ) {
      navigate("/talentReg")
    }
  }, [navigate, employerProfile, talentProfile, userInfo])

  return (
    <Grow in>
      <Container maxWidth='lg' className={classes.container}>
        <Paper elevation={6} className={classes.main} variant='elevation'>
          <Grid container className={classes.root}>
            <Grid item>
              <h1 className={classes.heading}>Login</h1>
            </Grid>
            {message && <AlertMessage severity={"error"} message={message} />}
            {error && <AlertMessage severity={"error"} message={error} />}
            <form className={classes.label} onSubmit={handleSubmit}>
              <Grid container item>
                {!sendOTP && (
                  <Grid item xs={12} className={classes.textField}>
                    <TextField
                      required
                      className={classes.textField}
                      type='email'
                      name='email'
                      label='E-mail'
                      variant='standard'
                      value={data.email}
                      onChange={e =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </Grid>
                )}
                {sendOTP && (
                  <Grid item xs={12} className={classes.textField}>
                    <TextField
                      required
                      className={classes.textField}
                      type='text'
                      name='otp code'
                      label='Otp Code'
                      variant='standard'
                      value={data.otp}
                      onChange={e => setData({ ...data, otp: e.target.value })}
                    />
                  </Grid>
                )}
                {!forgetPW && (
                  <Grid item xs={12} className={classes.textField}>
                    <TextField
                      required
                      className={classes.textField}
                      type={showPassword ? "text" : "password"}
                      name={newPW ? "new password" : "password"}
                      label={newPW ? "New Password" : "Password"}
                      value={data.password}
                      onChange={e =>
                        setData({ ...data, password: e.target.value })
                      }
                      variant='standard'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              type='button'
                              onClick={handleShowPassword}>
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} className={classes.button}>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    color: "white",
                    backgroundColor: "goldenrod !important",
                  }}
                  type='submit'>
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <CircularProgress size={30} />
                    </Box>
                  ) : forgetPW ? (
                    "Reset"
                  ) : (
                    "Login"
                  )}
                </Button>
              </Grid>
            </form>
            <Grid item className={classes.signup}>
              <Link
                to='/signup'
                style={{ textDecoration: "none", color: "rgba(117,81,159,1)" }}>
                Create a New Account
              </Link>
            </Grid>
            <Grid item>
              {/* <Link
                to="/signup"
                style={{ textDecoration: "none", color: "rgba(117,81,159,1)" }}
              > */}
              <Button
                variant='text'
                style={{ textDecoration: "none", color: "rgba(117,81,159,1)" }}
                onClick={() => {
                  setForgetPW(!forgetPW)
                }}>
                Forgot a password?
              </Button>

              {/* </Link> */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grow>
  )
}

export default LoginScreen
