import React, { useState, useEffect } from "react";
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
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Chip,
  ListItemButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllTalentAction } from "../actions/talentActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categoriesAvailable, skillsAvailable } from "../App";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Freelancer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm({});
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const {
    allTalentProfile,
    loading: talentLoading,
    error: talentError,
  } = useSelector((state) => state.talentInfo);

  const onSubmit = async (inputData) => {
    inputData.skills = skills;
    console.log(inputData);

    dispatch(
      getAllTalentAction({
        inputData: inputData,
        pageNumber,
      })
    );

    navigate("/freelancer/page/1");
  };

  useEffect(() => {
    // if (allTalentProfile && allTalentProfile.length <= 0) {
    let data = {
      category: "",
      keyword: "",
      experiencedLevel: "",
      skills: [],
    };
    dispatch(getAllTalentAction({ inputData: data, pageNumber }));
    // }
  }, [dispatch, pageNumber]);

  if (talentError !== null) {
    toast(talentError);
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
          <Grid item xs={12}>
            <h2>Freelancers</h2>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <input
                id="search"
                placeholder="Search by Talent Name or Email"
                name="search"
                style={{
                  borderRadius: "4px",
                  flex: "5",
                  height: "40px",
                  padding: "20px",
                  border: "1px solid rgb(223, 223, 223)",
                  boxShadow: "0px 2px 5px 0px #ececec",
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
              container
              xs={12}
              sx={{
                display: "flex",
                flex: "1",
                width: "100%",
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                container
                sx={{ height: "fit-content" }}
              >
                <Paper elevation={3} className={classes.filters}>
                  <Grid item xs={12} sx={{ padding: "3px 15px" }}>
                    <h2>Filters</h2>
                  </Grid>
                  <Divider />
                  <Grid item xs={12} sx={{ padding: "10px 15px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid item container spacing={4}>
                        <Grid
                          item
                          container
                          direction="column"
                          id="filter-post-title"
                        >
                          <h5>Experienced Level</h5>
                          <br></br>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Experienced Level
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Experienced Level"
                                id="demo-simple-select"
                                {...register("experiencedLevel")}
                              >
                                <MenuItem key={"B"} value={"Beginner"}>
                                  Beginner
                                </MenuItem>
                                <MenuItem key={"I"} value={"Intermediate"}>
                                  Intermediate
                                </MenuItem>
                                <MenuItem key={"E"} value={"Expert"}>
                                  Expert
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          container
                          direction="column"
                          id="filter-post-title"
                        >
                          <h5>Category</h5>
                          <br></br>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                label="Category"
                                id="demo-simple-select"
                                {...register("category")}
                              >
                                <MenuItem value={"all"}>All</MenuItem>
                                {categoriesAvailable.map((category, i) => (
                                  <MenuItem key={i} value={category.value}>
                                    {category.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          container
                          direction="column"
                          id="filter-post-title"
                        >
                          <h5>Skills</h5>
                          <br></br>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-multiple-chip-label">
                                Skills
                              </InputLabel>
                              <Select
                                label="Skills"
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={skills}
                                onChange={handleChange}
                                input={
                                  <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                  />
                                }
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {skillsAvailable.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    // style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                      <Button
                        id="filter-post-btn"
                        sx={{ margin: "25px 0px", padding: "8px 35px" }}
                        variant="outlined"
                        type="submit"
                      >
                        Save
                      </Button>
                    </form>
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                container
                sx={{
                  flexDirection: "column",
                  display: "flex",
                  padding: "0px 10px",
                  margin: "10px 0px",
                  flex: "1",
                }}
              >
                <Paper elevation={3}>
                  <Paginate pageNumber={pageNumber} freelancer={true} />
                  {talentLoading ? (
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
                  ) : allTalentProfile && allTalentProfile.length > 0 ? (
                    <Grid
                      xs={12}
                      container
                      sx={{ flex: "1", display: "flex", padding: "10px 0px" }}
                    >
                      <List
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flex: "1",
                          width: "100%",
                          alignItems: "flex-start",
                          // border: " 0.5px solid #eaeaea",
                          borderRadius: "4px",
                          margin: "0px 10px",
                          // background: "#def2ee",
                          boxShadow: "0px 3px 8px #eaeaea ",
                        }}
                      >
                        {allTalentProfile.map((talent, i) => (
                          <>
                            <ListItem key={i}>
                              <Link
                                to={
                                  userInfo.jobType === "admin"
                                    ? `/talentDashboard/${talent.userTalentId._id}`
                                    : `/talentProfile/${talent.userTalentId._id}`
                                }
                                style={{
                                  display: "flex",
                                  textDecoration: "none",
                                  flex: 1,
                                  color: "black",
                                  alignItems: "center",
                                }}
                              >
                                <ListItemButton
                                  style={{
                                    alignItems: "flex-start",
                                    border: " 0.5px solid #eaeaea",
                                    borderRadius: "4px",
                                    margin: "0px 10px",
                                    background: "#def2ee",
                                    boxShadow: "0px 3px 8px #eaeaea ",
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      sx={{
                                        width: 60,
                                        height: 60,
                                        margin: "0px 10px 0px 0px",
                                      }}
                                      alt={talent.profile.name.split("")[0]}
                                      src={
                                        talent.profile.image
                                          ? require(`../uploads/${talent.profile.image}`)
                                              .default
                                          : talent.profile.name.split("")[0]
                                      }
                                    ></Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={talent.profile.name}
                                    secondary={
                                      <>
                                        <Typography variant="body1">
                                          {talent.profile.email}
                                        </Typography>
                                        <Typography variant="body1">
                                          {talent.profile.title}
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
                                              talent.profile.rating /
                                              talent.profile.ratingper
                                            }
                                            precision={0.5}
                                            readOnly
                                          />
                                        </Grid>
                                      </>
                                    }
                                  />
                                </ListItemButton>
                              </Link>
                            </ListItem>
                            {!(allTalentProfile.length - 1 === i) && (
                              <Divider light variant="inset" />
                            )}
                          </>
                        ))}
                      </List>
                    </Grid>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", padding: 5 }}
                    >
                      No any Talent for this search.
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Freelancer;
