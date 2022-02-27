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
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTalentProfileByUserTalentIdAction } from "../actions/talentActions";
import moment from "moment";

const TalentDashboard = () => {
  const { talentProfile, loading } = useSelector((state) => state.talentInfo);
  const dispatch = useDispatch();
  const params = useParams();

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

  // console.log(talentProfile);

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
        ) : talentProfile ? (
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
                          ? talentProfile.profile.image
                          : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                      }
                    />
                  </Card>
                </Grid>
                <Grid item spacing={3} xs={12} md={8}>
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      {talentProfile.profile.name}
                    </Typography>
                  </Grid>
                  <Typography variant="h6" mt={1}>
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
                      readOnly
                    />
                  </Grid>
                  <div className="rating-info">
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ paddingLeft: 0.5, marginTop: 1 }}
                    >
                      {`${talentProfile.profile.ratingper} 
                    reviews`}
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
                    <MonetizationOnRoundedIcon
                      sx={{
                        color: "green",
                        fontSize: "20px",
                        paddingRight: "3px",
                      }}
                    />
                    <Typography variant="body2" mt={0.1} gutterBottom>
                      {talentProfile.profile.profileRate}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={4} sx={{ marginTop: "20px" }}>
                  <Chip
                    icon={<CircleIcon sx={{ fontSize: "14px" }} />}
                    label="Online"
                    color="success"
                    variant="outlined"
                  />
                  <Typography variant="body2" mt={2} gutterBottom>
                    {
                      (talentProfile.address.city,
                      talentProfile.address.country)
                    }
                  </Typography>
                  <Typography variant="body1" mt={2} gutterBottom>
                    Joins in{" "}
                    {
                      moment(talentProfile.createdAt)
                        ._d.toString()
                        .split("GMT")[0]
                    }
                  </Typography>
                  <Typography variant="body1" mt={2} mb={3} gutterBottom>
                    {talentProfile.profile.experiencedLevel} Level
                  </Typography>
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
                      <Button variant="outlined" color="secondary">
                        Edit
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" mt={1} gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" mt={0.1} gutterBottom>
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
                <Typography variant="h5" mt={1} gutterBottom>
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
                      sx={{ mt: 2, mr: 1 }}
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
                  <Typography variant="h5" mt={1} gutterBottom>
                    Education
                  </Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h6" mt={1} gutterBottom>
                      College/University
                    </Typography>
                    <Typography variant="body1" mt={1} gutterBottom>
                      {talentProfile.education.college}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" mt={1} gutterBottom>
                      Degree
                    </Typography>
                    <Typography variant="body1" mt={1} gutterBottom>
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
                  <Typography variant="h5" mt={1} gutterBottom>
                    Social Account
                  </Typography>
                </Stack>
                <Divider />
                <Grid item container sx={{ alignItems: "center" }}>
                  <Grid item sx={{ flex: 1 }}>
                    <EmailIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    <Link
                      to={`mailto:${talentProfile.profile.email}?subject=Subject&body=Body%20goes%20here`}
                      style={{ marginTop: "10px", textDecoration: "none" }}
                    >
                      {talentProfile.profile.email}
                    </Link>
                  </Grid>
                  <Grid item sx={{ flex: 1 }}>
                    <FacebookIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.facebookId}
                  </Grid>
                </Grid>{" "}
                <Grid item container sx={{ alignItems: "center" }}>
                  <Grid item sx={{ flex: 1 }}>
                    <GitHubIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.githubId}
                  </Grid>
                  <Grid item sx={{ flex: 1 }}>
                    <TwitterIcon
                      color="primary"
                      sx={{ fontSize: "20px", margin: "5px 10px" }}
                    />
                    {talentProfile.socialProfile.twitterId}
                  </Grid>
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
