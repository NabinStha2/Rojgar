import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box } from "@mui/system";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvancedPostAction,
  getAllPostAction,
  getCategoryPostAction,
} from "../actions/postActions";
import { categoriesAvailable, skillsAvailable } from "../App";

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
  },
  button: {
    flex: "1",
    margin: "0px 10px !important",
    height: "40px",
  },
  project: {
    margin: "10px 0px",
    flex: "1",
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#D3D3D3",
    },
  },
  resultHeader: {
    padding: "5px 15px",
  },
  price: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column !important",
    alignItems: "flex-end",
  },
  skills: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    border: "1px solid black",
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

const PostScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      category: params.category,
      skillsRequirement: [],
    },
  });
  const classes = useStyles();

  const getPosts = useSelector((state) => state.getPosts);
  const { loading, posts } = getPosts;

  const [skills, setSkills] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = async (inputData) => {
    inputData.skillsRequirement = skills;
    console.log(inputData);

    if (inputData.category === "all") {
      console.log("if");
      dispatch(
        getAllPostAction({
          inputData: inputData,
        })
      );
    } else {
      console.log("else");
      dispatch(
        getAdvancedPostAction({
          inputData: inputData,
        })
      );
    }

    if (
      inputData.experiencedLevel !== "" &&
      inputData.price !== "" &&
      inputData.keyword !== ""
    ) {
      navigate(
        `/projects/${inputData.category}/search/${inputData.keyword}/price/${inputData.price}/experience/${inputData.experiencedLevel}`
      );
    } else if (inputData.experiencedLevel !== "" && inputData.price !== "") {
      navigate(
        `/projects/${inputData.category}/price/${inputData.price}/experience/${inputData.experiencedLevel}`
      );
    } else if (inputData.experiencedLevel !== "" && inputData.keyword !== "") {
      navigate(
        `/projects/${inputData.category}/search/${inputData.keyword}/experience/${inputData.experiencedLevel}`
      );
    } else if (inputData.price !== "" && inputData.keyword !== "") {
      navigate(
        `/projects/${inputData.category}/search/${inputData.keyword}/price/${inputData.price}`
      );
    } else if (inputData.price !== "") {
      navigate(`/projects/${inputData.category}/price/${inputData.price}`);
    } else if (inputData.keyword !== "") {
      navigate(`/projects/${inputData.category}/search/${inputData.keyword}`);
    } else if (inputData.experiencedLevel !== "") {
      navigate(
        `/projects/${inputData.category}/experience/${inputData.experiencedLevel}`
      );
    }
  };

  // console.log(posts);

  useEffect(() => {
    if (posts.length === 0) {
      if (params.category) {
        dispatch(
          getCategoryPostAction({
            category: params.category,
          })
        );
      }
    }
  }, []);

  return (
    <Grow in>
      <Container maxWidth="lg">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <h2>Browse</h2>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <input
                id="search"
                placeholder="search projects"
                name="search"
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  flex: "4",
                  height: "40px",
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
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={4} container sx={{ height: "fit-content" }}>
              <Paper elevation={8} className={classes.filters}>
                <Grid item xs={12} sx={{ padding: "3px 15px" }}>
                  <h2>Filters</h2>
                </Grid>
                <Divider />
                <Grid item xs={12} sx={{ padding: "10px 15px" }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item container spacing={4}>
                      <Grid item container direction="column">
                        <h4>Max Price</h4>
                        <Grid
                          item
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <h6
                            style={{
                              display: "flex",
                              height: "100%",
                              paddingRight: "4px",
                              alignItems: "center",
                            }}
                          >
                            Rs.
                          </h6>
                          <input
                            type="number"
                            style={{ width: "100%" }}
                            name="price"
                            {...register("price")}
                            placeholder="0"
                          />
                        </Grid>
                      </Grid>
                      <Grid item container direction="column">
                        <h4>Experienced Level</h4>
                        <br></br>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Experienced Level
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              {...register("experiencedLevel")}
                            >
                              <MenuItem value={"Beginner"}>Beginner</MenuItem>
                              <MenuItem value={"Intermediate"}>
                                Intermediate
                              </MenuItem>
                              <MenuItem value={"Expert"}>Expert</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item container direction="column">
                        <h4>Category</h4>
                        <br></br>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Category
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              {...register("category")}
                            >
                              <MenuItem value={"all"}>All</MenuItem>
                              {categoriesAvailable.map((category) => (
                                <MenuItem value={category.value}>
                                  {category.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item container direction="column">
                        <h4>Skills</h4>
                        <br></br>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">
                              Skills
                            </InputLabel>
                            <Select
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
                      sx={{ margin: "15px 0px" }}
                      variant="outlined"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8} container>
              <Paper elevation={8} className={classes.project}>
                <Grid item container className={classes.resultHeader}>
                  <Grid item xs={8}>
                    <h2>Top Result</h2>
                  </Grid>
                  {/* <Grid item xs={4}>
                    Hey
                  </Grid> */}
                </Grid>

                <Divider />

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
                ) : posts && posts.length !== 0 ? (
                  <Grid item xs={12} container>
                    <List style={{ flex: 1 }}>
                      {posts.map((item, i) => (
                        <ListItem
                          key={i}
                          className={classes.listItem}
                          divider
                          disablePadding
                        >
                          <Link
                            to={`/project/${item._id}`}
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
                                  <h4>{item.title}</h4>
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
                                    {item.description}
                                  </Typography>
                                  <Grid item className={classes.skills}>
                                    <h6>
                                      <strong>Skills Required- </strong>
                                      {item.skillsRequirement.map((skill, i) =>
                                        item.skillsRequirement.length - 1 !== i
                                          ? `${skill} , `
                                          : skill
                                      )}
                                    </h6>
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ padding: "5px 0px 0px 0px" }}
                                  >
                                    <Box>
                                      <strong>Experience: </strong>
                                      {item.experiencedLevel}
                                    </Box>
                                  </Grid>
                                  <Grid item sx={{ padding: "5px 0px" }}>
                                    <Box>
                                      <strong>Category:</strong> {item.category}
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
                                <Grid item xs={4} className={classes.price}>
                                  <Box>Rs. {item.price}</Box>
                                  <Box>{moment(item.createdAt).fromNow()}</Box>
                                </Grid>
                              </Grid>
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                ) : (
                  <Grid
                    item
                    sx={{
                      padding: "10px",
                      display: "flex",
                      flex: "1",
                      justifyContent: "center",
                    }}
                  >
                    <h3>No posts!</h3>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default PostScreen;
