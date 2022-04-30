import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  Grow,
  Input,
} from "@mui/material";
// import FileBase64 from "react-file-base64";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEmployerAction } from "../actions/employerActions";
import { useState } from "react";

const EmployerEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location.state);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [goBack, setGoBack] = useState(false);
  const { loading, error } = useSelector((state) => state.employerInfo);
  // const [uploading, setUploading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: location.state.profile.email,
      name: location.state.profile.name,
      city: location.state.address.city,
      rating: location.state.profile.rating,
      ratingper: location.state.profile.ratingper,
      country: location.state.address.country,
      provience: location.state.address.provience,
      description: location.state.profile.description,
      vatId: location.state.profile.vatId,
      facebookId: location.state.socialProfile.facebookId,
      twitterId: location.state.socialProfile.twitterId,
      portfolioLink: location.state.socialProfile.portfolioLink,
      githubId: location.state.socialProfile.githubId,
      linkedinId: location.state.socialProfile.linkedinId,
      khaltiId: location.state.bankAcc.khaltiId,
      khaltiName: location.state.bankAcc.khaltiName,
      phoneNumber: location.state.profile.phoneNumber,
      image: "",
      citizenshipFile: "",
    },
  });

  const onSubmit = (inputData) => {
    inputData.email = location.state.profile.email;
    if (image) {
      inputData.image = image;
    } else {
      inputData.image = location.state.profile.image;
    }
    if (selectedFile) {
      inputData.citizenshipFile = selectedFile;
    } else {
      console.log("hey");
      inputData.citizenshipFile = location.state.document.citizenshipFile;
    }

    const formData = new FormData();
    formData.append("image1", inputData.image);
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("city", inputData.city);
    formData.append("phoneNumber", inputData.phoneNumber);
    formData.append("khaltiId", inputData.khaltiId);
    formData.append("khaltiName", inputData.khaltiName);
    formData.append("linkedinId", inputData.linkedinId);
    formData.append("githubId", inputData.githubId);
    formData.append("rating", inputData.rating);
    formData.append("ratingper", inputData.ratingper);
    formData.append("country", inputData.country);
    formData.append("provience", inputData.provience);
    formData.append("description", inputData.description);
    formData.append("vatId", inputData.vatId);
    formData.append("facebookId", inputData.facebookId);
    formData.append("twitterId", inputData.twitterId);
    formData.append("portfolioLink", inputData.portfolioLink);
    formData.append("image2", inputData.citizenshipFile);

    console.log(inputData);
    dispatch(
      editEmployerAction(
        {
          userEmployerId: location.state.userEmployerId,
          id: location.state._id,
        },
        formData,
        navigate
      )
    );

    setGoBack(true);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(image);
  };

  const uploadCitizenshipFileHandler = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Grow in>
      <Box
        xs={12}
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          flexDirection: "column",
          width: "80vw",
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
            <Typography variant="h5" textAlign="center" mb={2} gutterBottom>
              Edit
            </Typography>
            <Grid container spacing={3} mb={2}>
              <Grid
                item
                xs={12}
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    alt="employer-img"
                    height="200"
                    image={
                      image
                        ? URL.createObjectURL(image)
                        : location.state.profile.image
                        ? require(`../uploads/${location.state.profile.image}`)
                            .default
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>
                <Typography variant="body1" textAlign="left" gutterBottom>
                  Choose Image
                </Typography>
                <div
                  style={{
                    overflow: "hidden",
                    width: "150px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <TextField
                    variant="standard"
                    type="file"
                    name="image1"
                    onChange={uploadFileHandler}
                    fullWidth
                  />
                </div>

                {/* <input
                type="file"
                onChange={(e) => {
                  console.log(URL.createObjectURL(e.target.files[0]));
                  setImage(URL.createObjectURL(e.target.files[0]));
                }}
              /> */}
              </Grid>
              <Grid item xs={12} md={8} ml={3}>
                <Typography variant="body1" textAlign="left" gutterBottom>
                  Individual or Company Name
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
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    Name is required
                  </Typography>
                )}
                {errors.name?.type === "maxLength" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    Name must be atleast 20
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  textAlign="left"
                  mt={1}
                  gutterBottom
                >
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
                {errors.phoneno?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    Phone number is required
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  textAlign="left"
                  mt={1}
                  gutterBottom
                >
                  Email address
                </Typography>
                <TextField
                  variant="outlined"
                  disabled
                  label="Email"
                  {...register("email")}
                  fullWidth
                />
                {errors.email?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    Email is required
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  textAlign="left"
                  mt={1}
                  gutterBottom
                >
                  VAT ID
                </Typography>
                <TextField
                  variant="outlined"
                  label="Vat Id"
                  {...register("vatId", { required: true })}
                  fullWidth
                />
                {errors.vatId?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    Vat is required
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  textAlign="left"
                  mt={1}
                  gutterBottom
                >
                  Description about yourself
                </Typography>
                <TextField
                  variant="outlined"
                  multiline
                  label="Description"
                  rows={4}
                  {...register("description", { required: true })}
                  fullWidth
                />
                {errors.description?.type === "required" && (
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ color: "red" }}
                    gutterBottom
                  >
                    description is required
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Divider mt={2} />
            <Typography variant="h6" mt={1} align="left" p={1}>
              Social Account
            </Typography>
            <Grid container spacing={2} sx={{ padding: "0 10px" }} mb={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Facebook (Metaverse)"
                  {...register("facebookId")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Twitter"
                  fullWidth
                  {...register("twitterId")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Github"
                  fullWidth
                  {...register("githubId")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="LinkedIn"
                  fullWidth
                  {...register("linkedinId")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Website link (if have any)"
                  {...register("portfolioLink")}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Divider />
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

            <Divider />

            <Grid
              container
              pl={1}
              mb={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                //   alignItems: "center",
                //   justifyContent: "center",
              }}
            >
              <Typography variant="h6" mt={1} gutterBottom>
                Document Details
              </Typography>
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
                <Card sx={{ width: "fit-content" }}>
                  <CardMedia
                    component="img"
                    alt="talent-img"
                    height="200"
                    image={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : location.state.document.citizenshipFile
                        ? require(`../uploads/${location.state.document.citizenshipFile}`)
                            .default
                        : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                    }
                  />
                </Card>
                <div
                  style={{
                    overflow: "hidden",
                    width: "150px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <TextField
                    variant="standard"
                    type="file"
                    name="image2"
                    onChange={uploadCitizenshipFileHandler}
                    fullWidth
                  />

                  {/* <FileBase64
                    type="file"
                    multiple={false}
                    margin="normal"
                    onDone={(file) => {
                      // console.log(file);
                      setSelectedFile(file.base64);
                    }}
                  /> */}
                </div>
              </Grid>
            </Grid>
            <Divider />
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
          </Paper>

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
              variant="contained"
              type="submit"
              sx={{ width: "100%", marginLeft: 1 }}
            >
              Submit
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() =>
              navigate(`/employerDashboard/${location.state.userEmployerId}`)
            }
            sx={{ width: "100%", marginLeft: 1, marginTop: 2 }}
          >
            Go Back
          </Button>
        </form>
      </Box>
    </Grow>
  );
};
export default EmployerEdit;
