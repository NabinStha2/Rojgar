import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Grid,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Stack,
  OutlinedInput,
  Chip,
  Grow,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { categoriesAvailable, skillsAvailable } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCreateAction, postEditAction } from "../actions/postActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

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

const PostJob = () => {
  const location = useLocation();
  const [skillName, setSkillName] = useState([]);
  const [edit, setEdit] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      skillsRequirement: [],
      experiencedLevel: location.state.experiencedLevel,
      category: location.state.category,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.getPosts);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillName(typeof value === "string" ? value.split(",") : value);
  };

  const onSubmit = (inputData) => {
    console.log(inputData);
    inputData.skillsRequirement = skillName;
    if (edit) {
      dispatch(
        postEditAction(
          {
            inputData: inputData,
            postId: location.state._id,
          },
          navigate
        )
      );
    } else {
      dispatch(
        postCreateAction(
          {
            inputData: inputData,
            id: location.state._id,
          },
          navigate
        )
      );
    }
  };

  useEffect(() => {
    // console.log(location.state);
    if (location.pathname.split("/").includes("edit")) {
      setEdit(true);

      for (let [key, value] of Object.entries(location.state)) {
        // console.log(key, value);
        setValue(key, value);
      }
      setSkillName(location.state.skillsRequirement);
    }
  }, [location, setValue]);

  // console.log(edit);

  return (
    <Grow in>
      <Box
        xs={12}
        sx={{
          padding: 3,
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h5" p={3} gutterBottom>
            {edit ? "Edit a Job" : "Post a Job"}
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column" p={3}>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Write a headline of your post.
                </Typography>
                <TextField
                  label="Title"
                  {...register("title", { required: true })}
                  fullWidth
                />
                {errors.title?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    title is required
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Write a description about the post.
                </Typography>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={5}
                  {...register("description", { required: true })}
                />
                {errors.description?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    description is required
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Box sx={{ minWidth: 120 }}>
                  <Typography variant="h6" gutterBottom>
                    Skills Required
                  </Typography>
                  <FormControl fullWidth sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-chip-label">
                      Skills
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={skillName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {skillsAvailable.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  What level of Experience is needed
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Experience Level</InputLabel>
                  <Select
                    label="Experience Level"
                    {...register("experiencedLevel", { required: true })}
                  >
                    <MenuItem key={"B"} value="Beginner">
                      Beginner
                    </MenuItem>
                    <MenuItem key={"I"} value="Intermediate">
                      Intermediate
                    </MenuItem>
                    <MenuItem key={"E"} value="Expert">
                      Expert
                    </MenuItem>
                  </Select>
                </FormControl>
                {errors.experiencedLevel?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    Experienced Level is required
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Which category does it include
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Category</InputLabel>
                  <Select
                    label="Category"
                    {...register("category", { required: true })}
                  >
                    {categoriesAvailable.map((category, i) => (
                      <MenuItem key={i} value={category.value}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.category?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    Category is required
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Budget
                </Typography>

                <Input
                  variant="outlined"
                  type="Number"
                  placeholder="Project rate"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">Project Rate</InputAdornment>
                  }
                />

                {errors.price?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    Budget is required
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Stack ml={3} mb={3}>
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
                <Button
                  sx={{ width: "fit-content" }}
                  type="submit"
                  variant="contained"
                >
                  {edit ? "Edit Job" : " Submit Job"}
                </Button>
              )}
            </Stack>
          </form>
        </Paper>
      </Box>
    </Grow>
  );
};

export default PostJob;
