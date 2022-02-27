import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Chip,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grow,
  OutlinedInput,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { categoriesAvailable, skillsAvailable } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { editTalentAction } from "../actions/talentActions";

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

const TalentEditScreen = () => {
  const [skillName, setSkillName] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedCitizenshipFile, setSelectedCitizenshipFile] = useState(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.talentInfo);

  console.log(location.state);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location.state.profile.email,
      name: location.state.profile.name,
      city: location.state.address.city,
      country: location.state.address.country,
      provience: location.state.address.provience,
      description: location.state.profile.description,
      skills: [],
      experiencedLevel: location.state.profile.experiencedLevel,
      category: location.state.profile.category,
      profileRate: location.state.profile.profileRate,
      title: location.state.profile.title,
      college: location.state.education.college,
      degree: location.state.education.degree,
      facebookId: location.state.socialProfile.facebookId,
      twitterId: location.state.socialProfile.twitterId,
      portfolioLink: location.state.socialProfile.portfolioLink,
      githubId: location.state.socialProfile.githubId,
      linkedinId: location.state.socialProfile.linkedinId,
      khaltiId: location.state.bankAcc.khaltiId,
      khaltiName: location.state.bankAcc.khaltiName,
      phoneNumber: location.state.profile.phoneNumber,
      image: location.state.profile.image,
      citizenshipFile: location.state.document.citizenshipFile,
      resumeFile: location.state.document.resumeFile,
    },
  });

  const onSubmit = (inputData) => {
    inputData.email = location.state.profile.email;
    inputData.skills = skillName;
    if (image) {
      inputData.image = image;
    } else {
      inputData.image = location.state.profile.image;
    }
    if (selectedCitizenshipFile) {
      inputData.citizenshipFile = selectedCitizenshipFile;
    } else {
      inputData.citizenshipFile = location.state.document.citizenshipFile;
    }
    if (selectedResumeFile) {
      inputData.resumeFile = selectedResumeFile;
    } else {
      inputData.resumeFile = location.state.document.resumeFile;
    }

    console.log(inputData);
    dispatch(
      editTalentAction(
        {
          userTalentId: location.state.userTalentId,
          inputData: inputData,
          id: location.state._id,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    setSkillName(location.state.profile.skills);
  }, [location]);

  return (
    <Grow in>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Snackbar open={error} autoHideDuration={1000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
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
                      image
                        ? image
                        : location.state.profile.image
                        ? location.state.profile.image
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>{" "}
                <Typography variant="body1" textAlign="left" gutterBottom>
                  Choose Image
                </Typography>
                <div
                  style={{
                    overflow: "hidden",
                    width: "auto",
                    textOverflow: "ellipsis",
                    margin: "10px 0px",
                  }}
                >
                  <FileBase64
                    type="file"
                    multiple={false}
                    margin="normal"
                    onDone={(file) => {
                      // console.log(file);
                      setImage(file.base64);
                    }}
                  />
                </div>
                <Divider />
                <Typography variant="h6" mt={1} gutterBottom>
                  Profile Rate
                </Typography>
                <TextField
                  label="Profile Rate"
                  variant="outlined"
                  type="Number"
                  fullWidth
                  {...register("profileRate", { required: true })}
                />
                {errors.profileRate?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    profileRate is required
                  </Typography>
                )}
                <Typography variant="h6" mt={2} gutterBottom>
                  Phone number
                </Typography>
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  type="number"
                  {...register("phoneNumber", {
                    required: true,
                    maxLength: 10,
                  })}
                  fullWidth
                />
                {errors.phoneNumber?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red", marginTop: "3px" }}
                    gutterBottom
                  >
                    Phone number is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Name"
                    {...register("name", { required: true, maxLength: 20 })}
                    fullWidth
                  />
                  {errors.name?.type === "required" && (
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{ color: "red", marginTop: "3px" }}
                      gutterBottom
                    >
                      Name is required
                    </Typography>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{ color: "red", marginTop: "3px" }}
                      gutterBottom
                    >
                      Name must be atleast 20
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" mt={2} gutterBottom>
                    Title
                  </Typography>
                  <TextField
                    label="Title"
                    variant="outlined"
                    {...register("title", { required: true })}
                    fullWidth
                  />{" "}
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
                <Grid>
                  <Typography variant="h6" mt={2} gutterBottom>
                    Description
                  </Typography>
                  <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={8}
                    {...register("description", { required: true })}
                    fullWidth
                  />{" "}
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
              </Grid>
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            sx={{ margin: 1, padding: "15px", width: "100%" }}
          >
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" mt={1} align="left" p={1}>
                Address Details
              </Typography>
              <Grid container spacing={2} sx={{ padding: "0 10px" }} mb={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    label="Country"
                    {...register("country", { required: true })}
                    fullWidth
                  />
                  {errors.country?.type === "required" && (
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{ color: "red", marginTop: "3px" }}
                      gutterBottom
                    >
                      Country is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    label="State/Provience"
                    fullWidth
                    {...register("provience", { required: true })}
                  />
                  {errors.provience?.type === "required" && (
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{ color: "red", marginTop: "3px" }}
                      gutterBottom
                    >
                      Provience is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    label="City"
                    fullWidth
                    {...register("city", { required: true })}
                  />{" "}
                  {errors.city?.type === "required" && (
                    <Typography
                      variant="body2"
                      textAlign="left"
                      sx={{ color: "red", marginTop: "3px" }}
                      gutterBottom
                    >
                      City is required
                    </Typography>
                  )}
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  label="Zip/Postal code"
                  fullWidth
                  {...register("EZip")}
                />
              </Grid> */}
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
                <FormControl sx={{ marginTop: 2, width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
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
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
              </Grid>
            </Grid>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" mt={3} gutterBottom>
                Experienced Level
              </Typography>
              <Divider />
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Your level of experience
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Experience Level</InputLabel>
                  <Select
                    label="Experience Level"
                    defaultValue={location.state.profile.experiencedLevel}
                    {...register("experiencedLevel", { required: true })}
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Expert">Expert</MenuItem>
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
              <Typography variant="h5" mt={3} gutterBottom>
                Category Level
              </Typography>
              <Divider />
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Which category does you include
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="select-label">Category</InputLabel>
                  <Select
                    label="Category"
                    defaultValue={location.state.profile.category}
                    {...register("category", { required: true })}
                  >
                    {categoriesAvailable.map((category) => (
                      <MenuItem value={category.value}>
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
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            sx={{ margin: 1, padding: "15px", width: "100%" }}
          >
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" mt={2} gutterBottom p={1}>
                Bank Account
              </Typography>
              <Grid container spacing={2} sx={{ padding: "0 10px" }} mb={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    label="Khalti Name"
                    {...register("khaltiName")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="Number"
                    label="Khalti Id"
                    fullWidth
                    {...register("khaltiId")}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            sx={{ margin: 1, padding: "15px", width: "100%" }}
          >
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Stack>
                <Typography variant="h5" mt={2} gutterBottom>
                  Education
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" mt={2} gutterBottom>
                    College/University
                  </Typography>
                  <TextField
                    label="College/University"
                    variant="outlined"
                    {...register("college", { required: true })}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" mt={2} gutterBottom>
                    Degree
                  </Typography>
                  <TextField
                    label="College/University"
                    variant="outlined"
                    {...register("degree", { required: true })}
                    fullWidth
                  />
                </Grid>
              </Stack>
            </Grid>
            <Typography variant="h5" mt={3} gutterBottom>
              Document Details
            </Typography>
            <Divider />
            <Grid
              container
              pl={1}
              mb={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" mt={2} gutterBottom>
                  Citizenship Document
                </Typography>
                <Card sx={{ width: "fit-content", margin: "10px 0px" }}>
                  <CardMedia
                    component="img"
                    alt="talent-img"
                    height="200"
                    sx={{ width: "200px" }}
                    image={
                      selectedCitizenshipFile
                        ? selectedCitizenshipFile
                        : location.state.document.citizenshipFile
                        ? location.state.document.citizenshipFile
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>
                <div
                  style={{
                    overflow: "hidden",
                    width: "auto",
                    textOverflow: "ellipsis",
                    backgroundColor: "bisque",
                    color: "blueviolet",
                  }}
                >
                  <FileBase64
                    type="file"
                    multiple={false}
                    margin="normal"
                    onDone={(file) => {
                      // console.log(file);
                      setSelectedCitizenshipFile(file.base64);
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" mt={2} gutterBottom>
                  Resume Document
                </Typography>
                <Card sx={{ width: "fit-content", margin: "10px 0px" }}>
                  <CardMedia
                    component="img"
                    alt="talent-img"
                    height="200"
                    sx={{ width: "200px" }}
                    image={
                      selectedResumeFile
                        ? selectedResumeFile
                        : location.state.document.resumeFile
                        ? location.state.document.resumeFile
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>
                <div
                  style={{
                    overflow: "hidden",
                    width: "auto",
                    textOverflow: "ellipsis",
                    backgroundColor: "bisque",
                    color: "blueviolet",
                  }}
                >
                  <FileBase64
                    type="file"
                    multiple={false}
                    margin="normal"
                    onDone={(file) => {
                      // console.log(file);
                      setSelectedResumeFile(file.base64);
                    }}
                  />
                </div>
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
                  Social Account
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" sx={{ margin: 2, flex: "1" }}>
                <Grid
                  item
                  container
                  sx={{
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EmailIcon color="primary" sx={{ fontSize: "20px" }} />
                  <TextField
                    variant="outlined"
                    label="Email"
                    disabled
                    {...register("email", { required: true })}
                    sx={{ marginLeft: 2 }}
                  />
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FacebookIcon color="primary" sx={{ fontSize: "21px" }} />
                  <TextField
                    variant="outlined"
                    label="Facebook"
                    {...register("facebookId", { required: true })}
                    sx={{ marginLeft: 2 }}
                  />
                </Grid>
              </Stack>
              <Stack direction="row" sx={{ margin: 2 }}>
                <Grid
                  item
                  container
                  sx={{
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GitHubIcon color="primary" sx={{ fontSize: "21px" }} />
                  <TextField
                    variant="outlined"
                    label="GitHub"
                    {...register("githubId", { required: true })}
                    sx={{ marginLeft: 2 }}
                  />
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TwitterIcon color="primary" sx={{ fontSize: "21px" }} />
                  <TextField
                    variant="outlined"
                    label="Twitter"
                    {...register("twitterId", { required: true })}
                    sx={{ marginLeft: 2 }}
                  />
                </Grid>
              </Stack>
            </Grid>
          </Paper>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginLeft: 2 }}
          >
            <Button variant="text" sx={{ color: "purple" }}>
              Cancel
            </Button>
            {loading ? (
              <Grid
                item
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <CircularProgress variant="indeterminate" />
              </Grid>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "purple",
                  "&:hover": { color: "#1976d2" },
                  color: "purple",
                }}
                type="submit"
              >
                Done
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Grow>
  );
};
export default TalentEditScreen;
