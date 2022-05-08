import React, { useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grow,
  Grid,
  ListItem,
  Rating,
  List,
  Avatar,
  CircularProgress,
  ListItemAvatar,
  ListItemText,
  Typography,
  CardMedia,
  Card,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployerAction } from "../actions/employerActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    flex: "1",
    margin: "0px 10px !important",
    height: "40px",
  },
  filters: {
    flex: "1",
    margin: "10px 0px",
    padding: "5px 0px",
  },
}));

function EmployerList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({});
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const {
    allEmployerProfile,
    loading: employerLoading,
    error: employerError,
  } = useSelector((state) => state.employerInfo);

  const onSubmit = async (inputData) => {
    console.log(inputData);

    dispatch(getAllEmployerAction({ inputData, pageNumber }));

    navigate("/employerList/page/1");
  };

  useEffect(() => {
    let data = {
      category: "",
      keyword: "",
      experiencedLevel: "",
      email: "",
      skills: [],
    };
    dispatch(getAllEmployerAction({ inputData: data, pageNumber }));
  }, [dispatch, pageNumber]);

  if (employerError !== null) {
    toast(employerError);
  }

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid
          container
          className={classes.root}
          sx={{ flexDirection: "column" }}
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sx={{
              marginLeft: "10px",
            }}
          >
            <h2>Employer</h2>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <input
                id="search"
                placeholder="Search by Employer Name or Email"
                name="search"
                style={{
                  borderRadius: "4px",
                  flex: "5",
                  height: "40px",
                  padding: "20px",
                  border: "1px solid rgb(223, 223, 223)",
                  boxShadow: "0px 2px 5px 0px #ececec",
                  marginLeft: "10px",
                }}
                {...register("keyword")}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Search
              </Button>
            </form>
            <Grid
              item
              xs={12}
              container
              sx={{
                flexDirection: "column",
                display: "flex",
                padding: "0px 10px",
                flex: "1",
              }}
            >
              <Paper elevation={3} sx={{ marginTop: "10px" }}>
                <Paginate pageNumber={pageNumber} employer={true} />
                {employerLoading ? (
                  <Grid
                    item
                    sx={{
                      padding: "10px",
                      display: "flex",
                      flex: "1",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress variant="indeterminate" />
                  </Grid>
                ) : allEmployerProfile && allEmployerProfile.length > 0 ? (
                  <Grid item xs={12} container>
                    <List
                      sx={{
                        width: "100%",
                        display: "flex",
                        flex: "1",
                        alignItems: "flex-start",
                        border: " 0.5px solid #eaeaea",
                        borderRadius: "4px",
                        background: "#def2ee",
                        boxShadow: "0px 3px 8px #eaeaea ",
                        padding: "30px 0px",
                        margin: "12px 10px",
                      }}
                    >
                      {allEmployerProfile.map((employer, i) => (
                        <>
                          <ListItem key={i}>
                            <Link
                              to={`/employerProfile/${employer.userEmployerId._id}`}
                              style={{
                                display: "flex",
                                textDecoration: "none",
                                flex: 1,
                                color: "black",
                                alignItems: "center",
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    margin: "0px 10px 0px 0px",
                                  }}
                                  alt={employer.profile.name.split("")[0]}
                                  src={
                                    employer.profile.image
                                      ? require(`../uploads/${employer.profile.image}`)
                                          .default
                                      : employer.profile.name.split("")[0]
                                  }
                                ></Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={employer.profile.name}
                                secondary={
                                  <>
                                    <Typography variant="body1">
                                      {employer.profile.email}
                                    </Typography>

                                    <Grid
                                      item
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "10px 0px",
                                      }}
                                    >
                                      <Rating
                                        name="half-rating-read"
                                        value={
                                          employer.profile.rating /
                                          employer.profile.ratingper
                                        }
                                        precision={0.5}
                                        readOnly
                                      />
                                    </Grid>
                                  </>
                                }
                              />
                            </Link>
                          </ListItem>
                          {!(allEmployerProfile.length - 1 === i) && (
                            <Divider light variant="inset" />
                          )}
                        </>
                      ))}
                    </List>
                  </Grid>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ padding: 4, textAlign: "center" }}
                  >
                    No any Employer for this search.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default EmployerList;
