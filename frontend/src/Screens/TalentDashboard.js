import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Chip,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  Stack,
  Button,
  Container,
  CircularProgress,
  Rating,
  Grow,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTalentProfileByUserTalentIdAction,
  editTalentRatingAction,
} from "../actions/talentActions";
import moment from "moment";

const TalentDashboard = ({ visit = false }) => {
  const { talentProfile, loading } = useSelector((state) => state.talentInfo);
  const dispatch = useDispatch();
  const params = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (params.userTalentId) {
      console.log(params.userTalentId);
      dispatch(
        getTalentProfileByUserTalentIdAction({
          id: params.userTalentId,
        })
      );
    }
  }, [dispatch, params]);

  console.log(talentProfile);

  return (
    <Grow in>
      <Container maxWidth="lg">
        {loading ? (
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
        ) : talentProfile && talentProfile !== null ? (
          <Box
            xs={12}
            sx={{
              padding: 3,
              display: "flex",
              justifyContent: "center",
              margin: 2,
              flexDirection: "column",
            }}
          >
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="talent-img"
                      height="200"
                      image={
                        talentProfile.profile.image
                          ? require(`../uploads/${talentProfile.profile.image}`)
                              .default
                          : talentProfile.profile.name.split("")[0]
                      }
                    />
                  </Card>
                </Grid>
                <Grid item spacing={3} xs={12} md={8}>
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      {talentProfile.profile.name}
                    </Typography>
                  </Grid>
                  <Typography variant="body1" mt={1} sx={{ color: "#605e5e" }}>
                    {talentProfile.profile.title}
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
                        talentProfile.profile.rating /
                        talentProfile.profile.ratingper
                      }
                      precision={0.5}
                      readOnly={
                        userInfo
                          ? userInfo._id === talentProfile.userTalentId
                            ? true
                            : false
                          : true
                      }
                      onChange={(event, newValue) => {
                        visit
                          ? dispatch(
                              editTalentRatingAction(
                                {
                                  userTalentId: talentProfile.userTalentId,
                                  inputData: { rating: newValue },
                                  id: talentProfile._id,
                                  visit: true,
                                },
                                navigate
                              )
                            )
                          : dispatch(
                              editTalentRatingAction(
                                {
                                  userTalentId: talentProfile.userTalentId,
                                  inputData: { rating: newValue },
                                  id: talentProfile._id,
                                },
                                navigate
                              )
                            );
                      }}
                    />
                  </Grid>
                  <div className="rating-info">
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ paddingLeft: 0.5, marginTop: 1 }}
                    >
                      (
                      {`${talentProfile.profile.ratingper}
                    reviews`}
                      )
                    </Typography>
                  </div>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 1,
                    }}
                  >
                    <CurrencyRupeeIcon
                      sx={{
                        color: "green",
                        fontSize: "20px",
                        paddingRight: "3px",
                        marginTop: "3px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      mt={0.4}
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      {talentProfile.profile.profileRate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={4} sx={{ marginTop: "20px" }}>
                  {talentProfile.isLogin ? (
                    <Chip
                      icon={<CircleIcon sx={{ fontSize: "14px" }} />}
                      label="Online"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      icon={<CircleIcon sx={{ fontSize: "14px" }} />}
                      label="Offline"
                      color="warning"
                      variant="outlined"
                    />
                  )}
                  <Typography variant="body2" mt={2} gutterBottom>
                    {
                      (talentProfile.address.city,
                      talentProfile.address.country)
                    }
                  </Typography>
                  <Typography variant="body2" mt={2} gutterBottom>
                    <strong>Joined</strong>{" "}
                    {
                      moment(talentProfile.createdAt)
                        ._d.toString()
                        .split("GMT")[0]
                    }
                  </Typography>
                  <Typography
                    variant="body2"
                    mt={2}
                    mb={3}
                    gutterBottom
                    sx={{ fontWeight: "600" }}
                  >
                    {talentProfile.profile.experiencedLevel} Level
                  </Typography>
                  {userInfo &&
                    (userInfo.jobType === "admin" ||
                      talentProfile.userTalentId === userInfo._id) &&
                    !visit && (
                      <Grid item mt={2}>
                        <Link
                          to={`/talentEdit`}
                          state={talentProfile}
                          style={{
                            textDecoration: "none",
                            flex: 1,
                            color: "black",
                          }}
                        >
                          <Button
                            id="filter-post-btn"
                            variant="outlined"
                            color="secondary"
                            sx={{ padding: "8px 35px", border: "none" }}
                          >
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                    )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    background: "#e6e6e6",
                    padding: "10px",
                    borderRadius: "2px",
                  }}
                >
                  <Typography
                    variant="h6"
                    mt={1}
                    gutterBottom
                    sx={{ fontWeight: "600", fontSize: "22px" }}
                  >
                    Description
                  </Typography>
                  <Typography variant="body2" mt={0.1} gutterBottom>
                    {talentProfile.profile.description}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  mt={1}
                  gutterBottom
                  sx={{ fontWeight: "600" }}
                >
                  Skills
                </Typography>
                <Divider />
                <Grid item>
                  {talentProfile.profile.skills.map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
                      color="info"
                      variant="outlined"
                      sx={{
                        mt: 2,
                        mr: 1,
                        border: "none",
                        background: "#2b9af0",
                        color: "white",
                      }}
                    />
                  ))}
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Stack>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600" }}
                    mt={1}
                    gutterBottom
                  >
                    Education
                  </Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      mt={1}
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      College/University
                    </Typography>
                    <Typography variant="overline" mt={1} gutterBottom>
                      {talentProfile.education.college}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      mt={1}
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      Degree
                    </Typography>
                    <Typography variant="overline" mt={1} gutterBottom>
                      Degree in {talentProfile.education.degree}
                    </Typography>
                  </Grid>
                </Stack>
              </Grid>
            </Paper>
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Stack>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600" }}
                    mt={1}
                    gutterBottom
                  >
                    Bank Account
                  </Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      mt={1}
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      Khalti Name
                    </Typography>
                    <Typography variant="overline" mt={1} gutterBottom>
                      {talentProfile.bankAcc.khaltiName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      mt={1}
                      gutterBottom
                      sx={{ fontWeight: "600" }}
                    >
                      Khalti ID
                    </Typography>
                    <Typography variant="overline" mt={1} gutterBottom>
                      {talentProfile.bankAcc.khaltiId}
                    </Typography>
                  </Grid>
                </Stack>
              </Grid>
            </Paper>
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Stack>
                  <Typography
                    variant="h6"
                    mt={1}
                    gutterBottom
                    sx={{ fontWeight: "600" }}
                  >
                    Social Account
                  </Typography>
                </Stack>
                <Divider />
                <Grid item container sx={{ alignItems: "center" }}>
                  <Grid item sx={{ flex: 1, mt: 2 }}>
                    <EmailIcon
                      sx={{
                        fontSize: "20px",
                        margin: "5px 10px",
                        color: "#f40404",
                      }}
                    />
                    <Link
                      to={`mailto:${talentProfile.profile.email}?subject=Subject&body=Body%20goes%20here`}
                      style={{ marginTop: "10px", textDecoration: "none" }}
                    >
                      {talentProfile.profile.email}
                    </Link>
                  </Grid>
                  <Grid item sx={{ flex: 1, mt: 2 }}>
                    <FacebookIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.facebookId}
                  </Grid>
                </Grid>{" "}
                <Grid item container sx={{ alignItems: "center" }}>
                  <Grid item sx={{ flex: 1, mt: 2 }}>
                    <GitHubIcon
                      color="black"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.githubId}
                  </Grid>
                  <Grid item sx={{ flex: 1, mt: 2 }}>
                    <TwitterIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.twitterId}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={3}
              sx={{ margin: 1, padding: "15px", width: "100%" }}
            >
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" mt={1} gutterBottom>
                  Bidding Projects
                </Typography>
                <Divider />
                <Grid item xs={12} container>
                  <List style={{ flex: 1 }}>
                    {talentProfile.bids.map((item, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#D3D3D3",
                          },
                        }}
                        divider
                        disablePadding
                      >
                        <Link
                          to={`/project/${item.postId._id}`}
                          style={{
                            textDecoration: "none",
                            flex: 1,
                            color: "black",
                          }}
                        >
                          <ListItemButton
                            style={{
                              alignItems: "flex-start",
                            }}
                          >
                            <Grid item container spacing={1}>
                              <Grid item xs={8} container direction="column">
                                <h4>{item.postId.title}</h4>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    color: "GrayText",
                                    overflow: "hidden",
                                    width: "250px",
                                    textOverflow: "ellipsis",
                                    padding: "0px 0px 10px 0px",
                                  }}
                                >
                                  {item.postId.description}
                                </Typography>
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h6>
                                    <strong>Skills Required- </strong>
                                    {item.postId.skillsRequirement !== null ? (
                                      item.postId.skillsRequirement.map(
                                        (skill, i) =>
                                          item.postId.skillsRequirement.length -
                                            1 !==
                                          i
                                            ? `${skill} , `
                                            : skill
                                      )
                                    ) : (
                                      <div></div>
                                    )}
                                  </h6>
                                </Grid>
                                <Grid item sx={{ padding: "5px 0px 0px 0px" }}>
                                  <Box>
                                    <strong>Experience: </strong>
                                    {item.postId.experiencedLevel}
                                  </Box>
                                </Grid>
                                <Grid item sx={{ padding: "5px 0px" }}>
                                  <Box>
                                    <strong>Category:</strong>{" "}
                                    {item.postId.category}
                                  </Box>
                                </Grid>
                                <Grid
                                  item
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    value={5}
                                    precision={0.5}
                                    readOnly
                                  />
                                  <p
                                    style={{
                                      paddingLeft: "5px",
                                      marginTop: "16px",
                                    }}
                                  >
                                    {/* {item.reviews} */}5
                                  </p>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={4}
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  flexDirection: "column !important",
                                  alignItems: "flex-end",
                                }}
                              >
                                <Box>
                                  <CurrencyRupeeIcon
                                    sx={{ fontSize: "18px" }}
                                  />
                                  {item.postId.price}
                                </Box>
                                <Box>
                                  {moment(item.postId.createdAt).fromNow()}
                                </Box>
                              </Grid>
                            </Grid>
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ) : (
          <Typography></Typography>
        )}
      </Container>
    </Grow>
  );
};
export default TalentDashboard;
