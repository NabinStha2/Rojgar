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
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
              id="search"
              placeholder="search by Employer name or email"
              name="search"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                flex: "4",
                height: "40px",
                width: "100%",
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
          <Divider />
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
            <Paper elevation={8} sx={{ marginTop: "10px" }}>
              {/* <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "gray",
                  flex: "1",
                }}
                variant="h6"
              >
                Employer
              </Typography> */}
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
                      bgcolor: "background.paper",
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
                              <Avatar>
                                <Card>
                                  <CardMedia
                                    component="img"
                                    alt="talent-img"
                                    height="200"
                                    image={
                                      employer.profile.image
                                        ? employer.profile.image
                                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                                    }
                                  />
                                </Card>
                              </Avatar>
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
                <Typography variant="body1">
                  No any Employer for this search.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default EmployerList;
