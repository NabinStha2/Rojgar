import React from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const EmployerEditScreen = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
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
        <Paper elevation={3} sx={{ margin: 1, padding: "15px", width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="talent-img"
                  height="200"
                  image="https://img.search.brave.com/YZ8HvSLdgaVvUGq1io_NN6jaXZlCVL2da1G4ANNvnO0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/TXNRQkd1TzA0SG1U/N0JjTjJYQjhBSGFF/OCZwaWQ9QXBp"
                />
              </Card>
              <Button variant="contained" sx={{ width: "100%", marginTop: 2 }}>
                Upload Image{" "}
              </Button>
              <Typography variant="h6" mt={1} gutterBottom>
                Phone Number
              </Typography>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                {...register("cPhoneNo", { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Organization Name
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Company
                </Typography>
                <TextField
                  label="Title"
                  variant="outlined"
                  {...register("companyName", { required: true })}
                  fullWidth
                />
              </Grid>
              <Grid>
                <Typography variant="h6" mt={1} gutterBottom>
                  Description
                </Typography>
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={6}
                  {...register("desCompany", { required: true })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ margin: 1, padding: "15px", width: "100%" }}>
          <Grid container sx={{ display: "flex", flexDirection: "column" }}>
            <Stack>
              <Typography variant="h5" mt={1} gutterBottom>
                Social Account
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" sx={{ margin: 2 }}>
              <EmailIcon color="primary" sx={{ fontSize: "20px" }} />
              <TextField
                variant="standard"
                {...register("cemail", { required: true })}
                sx={{ marginLeft: 2 }}
              />
            </Stack>
            <Stack direction="row" sx={{ margin: 2 }}>
              <FacebookIcon color="primary" sx={{ fontSize: "21px" }} />
              <TextField
                variant="standard"
                {...register("cfbId", { required: true })}
                sx={{ marginLeft: 2 }}
              />
            </Stack>
            <Stack direction="row" sx={{ margin: 2 }}>
              <GitHubIcon color="primary" sx={{ fontSize: "21px" }} />
              <TextField
                variant="standard"
                {...register("cgitId", { required: true })}
                sx={{ marginLeft: 2 }}
              />
            </Stack>
            <Stack direction="row" sx={{ margin: 2 }}>
              <TwitterIcon color="primary" sx={{ fontSize: "21px" }} />
              <TextField
                variant="standard"
                {...register("ctwtId", { required: true })}
                sx={{ marginLeft: 2 }}
              />
            </Stack>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ margin: 1, padding: "15px", width: "100%" }}>
          <Grid container sx={{ display: "flex", flexDirection: "column" }}>
            <Stack>
              <Typography variant="h5" mt={1} gutterBottom>
                Projects
              </Typography>
            </Stack>
            <Divider />
          </Grid>
        </Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginLeft: 2 }}
        >
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" type="submit">
            Done
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EmployerEditScreen;
