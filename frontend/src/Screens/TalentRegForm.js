import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardMedia,
  // Input,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Chip,
  CssBaseline,
  Container,
} from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerTalentAction } from "../actions/talentActions";
import { useNavigate } from "react-router-dom";
import { categoriesAvailable, skillsAvailable } from "../App";
import LZString from "lz-string";
// import FileBase64 from "react-file-base64";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginRight: theme.spacing(1)
//   }
// }));

function getSteps() {
  return ["Basic information", "Document Verificatioin", "Skills", "Payment"];
}
const BasicForm = () => {
  const { control } = useFormContext();
  const [image, setImage] = useState(null);
  return (
    <Box sx={{ height: "100%", marginBottom: "25px" }}>
      <Box
        p={2}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ maxWidth: "220px" }}>
              <CardMedia
                mb={1}
                component="img"
                alt="green iguana"
                height="220"
                image={
                  image
                    ? image
                    : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                }
              />
            </Card>
          </Grid>
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems="center"
            xs={12}
            sm={8}
          >
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <TextField
                  id="image"
                  variant="outlined"
                  type="file"
                  fullWidth
                  margin="auto"
                  onChange={(e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      // console.log(reader.result);
                      setImage(reader.result);
                      // var compressed = LZString.compress(reader.result);
                      // var str = LZString.decompress(compressed);
                      field.onChange(reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  }}
                />
              )}
            />
            {/* 
            <Button variant="contained" type="submit" color="primary">
              Upload Photo
            </Button> */}
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                placeholder="Enter Your First Name"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                placeholder="Enter Your Last Name"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => {
              return (
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select label="Gender" variant="outlined" {...field}>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dateOfBirth"
            render={({ field }) => (
              <TextField
                id="dateOfBirth"
                variant="outlined"
                type="date"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" align="Start" gutterBottom>
        Personal Details
      </Typography>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                id="email"
                label="Email Address"
                variant="outlined"
                placeholder="Enter Your Email Address"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <TextField
                id="phonenum"
                label="Phone Number"
                variant="outlined"
                placeholder="Enter Your Phone Number"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <TextField
                id="Country"
                label="Country"
                variant="outlined"
                placeholder="Enter Country Name"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="provience"
            render={({ field }) => (
              <TextField
                id="provience"
                label="State/Provience"
                variant="outlined"
                placeholder="Enter Provience Name"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField
                id="city"
                label="City"
                variant="outlined"
                placeholder="Enter City Name"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="zip-code"
            render={({ field }) => (
              <TextField
                id="zip-code"
                label="Zip/State code"
                variant="outlined"
                placeholder="Enter Zip code"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="profileRate"
            render={({ field }) => (
              <OutlinedInput
                variant="outlined"
                placeholder="Enter Profile rate"
                fullWidth
                {...field}
                startAdornment={
                  <InputAdornment position="start">Rs.</InputAdornment>
                }
              />
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" mt={2} align="Start" p={2} gutterBottom>
        Education
      </Typography>
      <Grid container spacing={3} sx={{ margin: "normal" }}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="college"
            render={({ field }) => (
              <TextField
                id="college"
                label="College/University"
                variant="outlined"
                placeholder="Enter College/University name"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="degree"
            render={({ field }) => (
              <TextField
                id="degree"
                label="Degree"
                variant="outlined"
                placeholder="Enter your degree"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" mt={1} align="Start" p={2} gutterBottom>
        Social Account
      </Typography>
      <Grid container spacing={3} sx={{ margin: "normal" }}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="facebookId"
            render={({ field }) => (
              <TextField
                id="facebookId"
                label="Facebook"
                variant="outlined"
                placeholder="Enter Facebook Id"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="githubId"
            render={({ field }) => (
              <TextField
                id="githubId"
                label="Github"
                variant="outlined"
                placeholder="Enter Github Id"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="twitterId"
            render={({ field }) => (
              <TextField
                id="twitterId"
                label="Twitter"
                variant="outlined"
                placeholder="Enter Twitter Id"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="linkedinId"
            render={({ field }) => (
              <TextField
                id="linkedinId"
                label="LinkedIn"
                variant="outlined"
                placeholder="Enter LinkedIn Id"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="portfolioLink"
            render={({ field }) => (
              <TextField
                id="portfolioLink"
                label="Portfolio Link (if any)"
                variant="outlined"
                placeholder="Enter Portfolio Link"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  const [citizenshipImage, setCitizenshipImage] = useState(null);
  const [resumeImage, setResumeImage] = useState(null);
  return (
    <>
      <Box p={0.8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" mt={1} gutterBottom>
              Citizenship Document
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <CardMedia
                mb={1}
                component="img"
                alt="green iguana"
                height="220"
                image={
                  citizenshipImage
                    ? citizenshipImage
                    : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                }
              />
            </Card>
            <Controller
              control={control}
              name="citizenshipFile"
              render={({ field }) => (
                <TextField
                  id="citizenshipFile"
                  variant="outlined"
                  type="file"
                  fullWidth
                  margin="normal"
                  onChange={(e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      // console.log(reader.result);
                      setCitizenshipImage(reader.result);
                      // var compressed = LZString.compress(reader.result);
                      field.onChange(reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  }}
                  // {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" mt={1} gutterBottom>
              Resume Document
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card sx={{ maxWidth: "220px" }}>
              <CardMedia
                mb={1}
                component="img"
                alt="green iguana"
                height="220"
                image={
                  resumeImage
                    ? resumeImage
                    : "https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                }
              />
            </Card>
            <Controller
              control={control}
              name="resumeFile"
              render={({ field }) => (
                <TextField
                  id="resumeFile"
                  variant="outlined"
                  type="file"
                  fullWidth
                  margin="normal"
                  onChange={(e) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      setResumeImage(reader.result);
                      // console.log(reader.result);
                      // var compressed = LZString.compress(reader.result);
                      field.onChange(reader.result);
                    };
                    reader.onerror = function (error) {
                      console.log("Error: ", error);
                    };
                  }}
                  // {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

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

const PersonalForm = () => {
  //   const [skills, setSkills] = React.useState([]);

  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setSkills(
  //       // On autofill we get a stringified value.
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };

  const { control } = useFormContext();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" align="Start" gutterBottom>
            Title
          </Typography>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                id="tilte"
                label="Title"
                variant="outlined"
                placeholder="Enter Title"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="Start" gutterBottom>
            Description
          </Typography>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={5}
                placeholder="Enter Description"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="Start" gutterBottom>
            Skills Categories
          </Typography>
          <Controller
            control={control}
            name="skills"
            defaultValue={[]}
            render={({ field }) => (
              <Box mt={1} mb={1}>
                <FormControl sx={{ m: 1, width: 300 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Skills</InputLabel>
                  <Select
                    id="demo-multiple-chip"
                    multiple
                    {...field}
                    input={<OutlinedInput id="select-multiple-chip" />}
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
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="Start" gutterBottom>
            Categories
          </Typography>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Box mt={1} mb={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select variant="outlined" {...field}>
                    {categoriesAvailable.map((category) => (
                      <MenuItem value={category.value}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="Start" gutterBottom>
            Experience Level
          </Typography>
          <Controller
            control={control}
            name="experiencedLevel"
            render={({ field }) => (
              <Box mb={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Experienced Level
                  </InputLabel>
                  <Select variant="outlined" {...field}>
                    <MenuItem value={"Beginner"}>Beginner</MenuItem>
                    <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                    <MenuItem value={"Expert"}>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h6" align="Start" gutterBottom>
        Khalti Number
      </Typography>
      <Controller
        control={control}
        name="khaltiId"
        render={({ field }) => (
          <TextField
            id="khaltiId"
            label="Khalti Number"
            variant="outlined"
            placeholder="Enter Your Khalti Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Typography variant="h6" align="Start" gutterBottom>
        Khalti Name
      </Typography>
      <Controller
        control={control}
        name="khaltiName"
        render={({ field }) => (
          <TextField
            id="khaltiName"
            label="Khalti Name"
            variant="outlined"
            placeholder="Enter Your Khalti Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",

      email: "",
      phoneNumber: "",

      country: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (inputData) => {
    console.log(inputData);
    if (activeStep === steps.length - 1) {
      console.log("Completed");
      if (userInfo) {
        dispatch(
          registerTalentAction(
            {
              inputData,
              id: userInfo._id,
            },
            navigate
          )
        );
        setActiveStep(activeStep + 1);
      }
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                disabled={activeStep === 0}
                variant="contained"
                color="primary"
                sx={{ margin: "5px" }}
                onClick={handleBack}
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  sx={{ margin: "5px" }}
                >
                  skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ margin: "5px" }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

const TalentRegForm = () => {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinaerStepper />
        </Paper>
      </Container>
    </>
  );
};

export default TalentRegForm;
