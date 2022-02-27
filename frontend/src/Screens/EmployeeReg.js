// import React, { useEffect } from "react";
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerEmployerAction } from "../actions/employerActions";
import { useState } from "react";

const EmployeeRegistrationScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: userInfo.email,
      image: "",
      citizenshipFile: "",
    },
  });

  // console.log(userInfo);

  const onSubmit = (inputData) => {
    if (image) {
      inputData.image = image;
    }
    if (selectedFile) {
      inputData.citizenshipFile = selectedFile;
    }
    console.log(inputData);
    dispatch(
      registerEmployerAction(
        {
          inputData: inputData,
          id: userInfo._id,
        },
        navigate
      )
    );
  };

  return (
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
        <Paper elevation={3} sx={{ margin: 1, padding: "15px", width: "100%" }}>
          <Typography variant="h5" textAlign="center" mb={2} gutterBottom>
            Employee Registration
          </Typography>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="talent-img"
                  height="200"
                  image={
                    image
                      ? image
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
              <Typography variant="body1" textAlign="left" mt={1} gutterBottom>
                Phone number
              </Typography>
              <TextField
                variant="outlined"
                label="Phone Number"
                type="number"
                {...register("phoneNumber", { required: true, maxLength: 10 })}
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

              <Typography variant="body1" textAlign="left" mt={1} gutterBottom>
                Email address
              </Typography>
              <TextField
                variant="outlined"
                disabled
                label="Email"
                {...register("email", { value: userInfo.email })}
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
              <Typography variant="body1" textAlign="left" mt={1} gutterBottom>
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
              <Typography variant="body1" textAlign="left" mt={1} gutterBottom>
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
                {...register("country")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="State/Provience"
                fullWidth
                {...register("provience")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="City"
                fullWidth
                {...register("city")}
              />
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

          <Grid container pl={1} mb={2}>
            <Typography variant="h6" mt={1} gutterBottom>
              Document Details
            </Typography>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6" mt={2} gutterBottom>
                Citizenship Document
              </Typography>
              <Card>
                <CardMedia
                  component="img"
                  alt="talent-img"
                  height="200"
                  sx={{ width: "200px" }}
                  image={
                    selectedFile
                      ? selectedFile
                      : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                  }
                />
              </Card>

              <FileBase64
                type="file"
                multiple={false}
                margin="normal"
                onDone={(file) => {
                  // console.log(file);
                  setSelectedFile(file.base64);
                }}
              />
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
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%", marginLeft: 1 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
export default EmployeeRegistrationScreen;
