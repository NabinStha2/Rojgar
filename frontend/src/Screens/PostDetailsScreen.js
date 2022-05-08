import React, { useState, useEffect } from "react";
import {
  Grow,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  CircularProgress,
  Button,
  InputAdornment,
  Input,
  TextField,
  Card,
  CardContent,
  CardActions,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  getPostDetailsAction,
  postAcceptProposalAction,
  postDeleteAction,
  postFinishProposalAction,
} from "../actions/postActions";
import moment from "moment";
import {
  createTalentBidsAction,
  deleteTalentBidsAction,
  editTalentBidsAction,
  getTalentProfileByUserTalentIdAction,
} from "../actions/talentActions";
import { useForm } from "react-hook-form";
import { getEmployerProfileByEmployerIdAction } from "../actions/employerActions";
import Khalti from "../services/khalti";
import AlertMessage from "../components/Alert";

const PostDetailsScreen = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.getPosts);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { talentProfile, loading: loadingTalentProfile } = useSelector(
    (state) => state.talentInfo
  );
  // const { employerProfile, loading: loadingEmployerProfile } = useSelector(
  //   (state) => state.employerInfo
  // );
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      biddingAmt: "",
      proposalDescription: "",
      postId: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [aceptedTalent, setAcceptedTalent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   console.log(post);

  const onSubmit = (inputData) => {
    inputData.postId = post._id;
    console.log(inputData);

    if (open) {
      console.log("edit bids");
      dispatch(
        editTalentBidsAction({
          inputData: inputData,
          id: talentProfile._id,
        })
      );
    } else {
      dispatch(
        createTalentBidsAction({
          inputData: inputData,
          id: talentProfile._id,
        })
      );
    }

    setValue("biddingAmt", 0);
    setValue("proposalDescription", "");
  };

  const handleDeletePost = () => {
    dispatch(
      postDeleteAction(
        {
          id: post._id,
        },
        navigate
      )
    );
  };

  const handleDeleteBid = () => {
    dispatch(
      deleteTalentBidsAction({
        id: talentProfile._id,
        postId: post._id,
      })
    );
  };

  const handleAcceptProposal = (talentId) => {
    // console.log(talentId);
    dispatch(
      postAcceptProposalAction(
        {
          talentId: talentId._id,
          postId: post._id,
        },
        navigate
      )
    );
  };

  const handleFinishProposal = (talentId) => {
    // console.log(talentId);
    dispatch(
      postFinishProposalAction(
        {
          talentId: talentId._id,
          postId: post._id,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (userInfo && userInfo.jobType === "Employer") {
      // console.log("dispatching employer");
      // dispatch(
      //   getEmployerProfileByEmployerIdAction({
      //     id: userInfo._id,
      //   })
      // );
    } else if (userInfo && userInfo.jobType === "Talent") {
      console.log("dispatching talent");
      userInfo &&
        dispatch(getTalentProfileByUserTalentIdAction({ id: userInfo._id }));
    }

    setEdit(location.pathname.split("/").includes("edit"));
    if (params.postId) {
      console.log("dispatching post");
      dispatch(getPostDetailsAction({ id: params.postId }));
    }
    // if (talentProfile && post) {
    //   console.log(talentProfile.bids.find((bid) => bid.postId === post._id));
    // }
  }, [location, dispatch, params, userInfo]);

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid
            item
            container
            xs={12}
            sm={8}
            sx={{ flexDirection: "column", flex: "1" }}
          >
            <Box>
              <Paper sx={{ margin: "10px 0px", padding: "15px" }} elevation={3}>
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
                ) : post ? (
                  <Grid
                    item
                    container
                    sx={{
                      flexDirection: "column",
                      flex: "1",
                    }}
                  >
                    <Grid item container sx={{ marginBottom: "10px" }}>
                      <Grid item xs={12} md={8}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "600",
                            mt: "12px",
                            fontSize: "32px",
                          }}
                        >
                          Project Details
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: { md: "flex-end" },
                          paddingRight: "10px",
                          paddingTop: { xs: "8px" },
                        }}
                      >
                        <Box sx={{ fontWeight: "bold" }}>
                          <strong>Rs.</strong> {post.price}
                        </Box>
                        <Box>posted {moment(post.createdAt).fromNow()}</Box>
                      </Grid>
                    </Grid>

                    <Divider />

                    <Typography
                      variant="h5"
                      sx={{
                        margin: "15px 0px 0px 0px",
                      }}
                    >
                      <strong id="project-post-title">
                        {post.title.toUpperCase()}
                      </strong>
                    </Typography>
                    <Typography
                      paragraph
                      variant="body"
                      sx={{ margin: "10px 0px" }}
                    >
                      <p>{post.description}</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        margin: "10px 0px 0px 0px",
                        fontWeight: "600",
                        fontSize: "22px",
                        marginBottom: "10px",
                      }}
                    >
                      Skills Required
                    </Typography>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px ",
                      }}
                    >
                      {post.skillsRequirement.map((skill, index) => (
                        <Box
                          sx={{
                            border: "none",
                            display: "flex",
                            borderRadius: "20px",
                            color: "white",
                            padding: "10px",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "5px",
                            marginBottom: "5px",
                            backgroundColor: "#44a4d0",
                            // "&:hover": {
                            //   border: "2px solid purple",
                            //   backgroundColor: "rgba(156, 39, 176, 0.3)",
                            //   color: "purple",
                            // },
                          }}
                        >
                          <Typography variant="body2">{skill}</Typography>
                        </Box>
                      ))}
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "8px 0px 10px 0px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ marginRight: 1, fontWeight: "600" }}
                      >
                        ExperiencedLevel :
                      </Typography>
                      <Typography
                        variant="overline"
                        sx={{ fontWeight: "500", fontSize: "18px" }}
                      >
                        {post.experiencedLevel}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "grey",
                            margin: "5px 3px",
                          }}
                        >
                          Project ID: {post._id}
                        </p>
                      </Grid>
                      {userInfo &&
                        (userInfo.jobType === "admin") |
                          (edit &&
                            post.employerId.userEmployerId ===
                              userInfo._id) && (
                          <Grid item>
                            <Link
                              to={"/postJob/edit"}
                              state={post}
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{ marginRight: "5px" }}
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="outlined"
                              color="warning"
                              sx={{ marginRight: "5px" }}
                              onClick={handleDeletePost}
                            >
                              Delete
                            </Button>
                          </Grid>
                        )}
                    </Grid>
                    {post.isPaid === false &&
                    userInfo &&
                    (userInfo.jobType === "admin") |
                      (post.employerId.userEmployerId === userInfo._id) ? (
                      <Khalti postId={post._id} />
                    ) : (
                      userInfo &&
                      (userInfo.jobType === "admin") |
                        (userInfo.jobType === "Employer") && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "grey",
                            margin: "10px 0px",
                          }}
                        >
                          Job has been paid to admin.You can accept talent.
                        </p>
                      )
                    )}
                  </Grid>
                ) : (
                  <Typography>No details!</Typography>
                )}
              </Paper>
            </Box>
          </Grid>

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
          ) : (
            post && (
              <Grid
                item
                container
                xs={12}
                sm={4}
                sx={{ flexDirection: "column", flex: "1" }}
              >
                <Card
                  sx={{ minWidth: 275, margin: "10px 0px", padding: "10px" }}
                  elevation={4}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 20 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Employer Details
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "600" }}
                    >
                      {post.employerId.profile.name}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      color="text.secondary"
                      variant="body1"
                    >
                      {post.employerId.profile.email}
                    </Typography>
                    <Typography variant="body2">
                      {post.employerId.profile.description}
                      <br />
                      {post.employerId.address.country}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`/employerProfile/${post.employerId.userEmployerId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small">More Info</Button>
                    </Link>
                  </CardActions>
                </Card>
                {post.proposalSubmitted.map(
                  (talent, i) =>
                    talent.isAccepted === true && (
                      <Card
                        sx={{
                          minWidth: 275,
                          margin: "10px 0px",
                          padding: "10px",
                        }}
                        elevation={4}
                      >
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Accepted Talent Details
                          </Typography>
                          <Typography variant="h5" component="div">
                            {talent.talentId.profile.name}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {talent.talentId.profile.email}
                          </Typography>
                          <Typography variant="body2">
                            {talent.talentId.profile.description}
                            <br />
                            {talent.talentId.address.country}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link
                            to={`/talentProfile/${talent.talentId.userTalentId}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button size="small">More Info</Button>
                          </Link>
                        </CardActions>
                      </Card>
                    )
                )}
              </Grid>
            )
          )}
        </Grid>

        {loadingTalentProfile ? (
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
        ) : loading ? (
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
        ) : userInfo &&
          userInfo.jobType === "Talent" &&
          talentProfile &&
          post ? (
          <>
            <Box sx={{ width: "100%", margin: "auto" }}>
              <Paper elevation={3} sx={{ padding: 3, mb: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      p={2}
                      sx={{ fontWeight: "600" }}
                    >
                      Place a Bid on this Project
                    </Typography>
                    <Divider />

                    <Typography
                      pl={3}
                      variant="overline"
                      sx={{
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        // fontWeight:'600'
                      }}
                      gutterBottom
                    >
                      You will be able to edit your bid until the project is
                      awarded to someone.
                    </Typography>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          color: "black",
                          fontWeight: "600",
                        }}
                        gutterBottom
                      >
                        Bid Amount
                      </Typography>
                      <Input
                        variant="outlined"
                        placeholder="0"
                        fullWidth
                        {...register("biddingAmt", { required: true })}
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{ paddingRight: 2 }}
                          >
                            Rs.
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            Project Rate
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "600",
                        }}
                        gutterBottom
                      >
                        Describe your proposal.
                      </Typography>
                      <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        {...register("proposalDescription", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Divider />
                    <Grid item xs={12} mt={2}>
                      <Button
                        // id='filter-post-btn'
                        disabled={
                          !!talentProfile.bids.find(
                            (bid) => bid.postId === post._id
                          )
                        }
                        variant="contained"
                        type="submit"
                      >
                        Place bid
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Box>
            {post.proposalSubmitted.map(
              (proposal) => talentProfile._id === proposal.talentId
            ) ? (
              <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                  Proposal submitted
                </Typography>
                <Divider />
                {post.proposalSubmitted.map((proposal) => (
                  <>
                    <Card variant="outlined" sx={{ marginTop: 3 }}>
                      <CardContent>
                        <Typography
                          variant="overline"
                          sx={{ fontSize: 16 }}
                          color="#5e5b5b"
                          gutterBottom
                        >
                          {proposal.talentId.profile.name}
                        </Typography>
                        <Typography variant="body1" component="div">
                          {proposal.talentId.profile.email}
                        </Typography>
                        <Typography
                          sx={{ mt: 1, mb: 1 }}
                          color="text.secondary"
                          variant="body2"
                        >
                          {proposal.proposalDescription}
                        </Typography>
                        <Typography
                          variant="overline"
                          sx={{ fontWeight: "600" }}
                        >
                          Rs.{proposal.biddingAmt}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Accepted:</strong>{" "}
                          {proposal.isAccepted === true ? "Yes" : "No"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Finished:</strong>{" "}
                          {proposal.isFinished === true ? "Yes" : "No"}
                        </Typography>
                      </CardContent>
                      {talentProfile._id === proposal.talentId._id &&
                        proposal.isAccepted === false && (
                          <CardActions>
                            <Button onClick={handleOpen} size="small">
                              Edit
                            </Button>
                            <Button
                              onClick={handleDeleteBid}
                              size="small"
                              variant="text"
                              color="warning"
                            >
                              Delete
                            </Button>
                          </CardActions>
                        )}
                    </Card>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400,
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Grid container spacing={2}>
                            <Typography variant="h6" gutterBottom p={2}>
                              Edit a Bid on this Project
                            </Typography>
                            <Divider />

                            <Typography
                              pl={3}
                              variant="body1"
                              sx={{
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                              }}
                              gutterBottom
                            >
                              You will be able to edit your bid until the
                              project is awarded to someone.
                            </Typography>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "16px",
                                  color: "black",
                                  fontWeight: "600",
                                }}
                                gutterBottom
                              >
                                Bid Amount
                              </Typography>
                              <Input
                                variant="outlined"
                                fullWidth
                                {...register("biddingAmt", { required: true })}
                                startAdornment={
                                  <InputAdornment
                                    position="start"
                                    sx={{ paddingRight: 2 }}
                                  >
                                    Rs.
                                  </InputAdornment>
                                }
                                endAdornment={
                                  <InputAdornment position="end">
                                    Project Rate
                                  </InputAdornment>
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "16px", color: "black" }}
                                gutterBottom
                              >
                                Describe your proposal.
                              </Typography>
                              <TextField
                                label="Description"
                                multiline
                                rows={4}
                                fullWidth
                                {...register("proposalDescription", {
                                  required: true,
                                })}
                              />
                            </Grid>
                            <Divider />
                            <Grid item xs={12} mt={2}>
                              <Button variant="contained" type="submit">
                                Place bid
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Modal>
                  </>
                ))}
              </Paper>
            ) : (
              <Typography></Typography>
            )}
          </>
        ) : userInfo ? (
          post &&
          (userInfo.jobType === "admin") |
            (post.employerId.userEmployerId === userInfo._id &&
              userInfo.jobType === "Employer") ? (
            post.proposalSubmitted.map((proposal) => (
              <Paper key={proposal._id} elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5">Proposal submitted</Typography>
                <Divider />
                <Card variant="outlined" sx={{ marginTop: 3 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {proposal.talentId.profile.name}
                    </Typography>
                    <Typography variant="body" component="div">
                      {proposal.talentId.profile.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {proposal.proposalDescription}
                    </Typography>
                    <Typography variant="body2">
                      Rs.{proposal.biddingAmt}
                    </Typography>
                    <Typography variant="body2">
                      Accepted: {proposal.isAccepted === true ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2">
                      Finished: {proposal.isFinished === true ? "Yes" : "No"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleAcceptProposal(proposal.talentId)}
                      disabled={post.isPaid === false || post.isAccept === true}
                      size="small"
                    >
                      {proposal.isAccepted ? "Accepted" : "Accept"}
                    </Button>
                    {proposal.isAccepted && (
                      <Button
                        onClick={() => handleFinishProposal(proposal.talentId)}
                        disabled={
                          post.isPaid === false || proposal.isFinished === true
                        }
                        size="small"
                      >
                        {proposal.isFinished ? "Finished" : "Finish"}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Paper>
            ))
          ) : (
            <Typography>No Proposal!!!</Typography>
          )
        ) : (
          <AlertMessage
            severity={"error"}
            message={"First, Login to place and see the bids."}
          />
        )}
      </Container>
    </Grow>
  );
};

export default PostDetailsScreen;
