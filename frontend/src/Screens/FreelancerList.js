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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllTalentAction } from "../actions/talentActions";
import { Link, useNavigate } from "react-router-dom";
import { categoriesAvailable, skillsAvailable } from "../App";
import { toast } from "react-toastify";

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
      })
    );

    navigate("/freelancer");
  };

  useEffect(() => {
    // if (allTalentProfile && allTalentProfile.length <= 0) {
    let data = {
      category: "",
      keyword: "",
      experiencedLevel: "",
      skills: [],
    };
    dispatch(getAllTalentAction({ inputData: data }));
    // }
  }, [dispatch]);

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
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <input
              id="search"
              placeholder="search by Talent name or email"
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
            container
            xs={12}
            sx={{
              display: "flex",
              flex: "1",
              width: "100%",
            }}
          >
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
              <Paper elevation={8}>
                {/* <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "gray",
                    flex: "1",
                  }}
                  variant="h6"
                >
                  Talent
                </Typography> */}
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
                  <Grid xs={12} container sx={{ flex: "1", display: "flex" }}>
                    <List
                      sx={{
                        dispay: "flex",
                        flex: "1",
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {allTalentProfile.map((talent, i) => (
                        <>
                          <ListItem key={i}>
                            <Link
                              to={`/talentProfile/${talent.userTalentId._id}`}
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
                                        talent.profile.image
                                          ? talent.profile.image
                                          : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                                      }
                                    />
                                  </Card>
                                </Avatar>
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
                  <Typography variant="body1">
                    No any Talent for this search.
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

export default Freelancer;
