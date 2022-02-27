import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { Grid, Grow } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px",
    color: "white",
    backgroundColor: "#777B95",
    flexDirection: "row !important",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column !important",
      // textAlign: "center",
    },
  },
  text: {
    padding: "0px 20px 0px 20px !important",
    flexDirection: "row !important",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0px !important",
    },
  },
  p: {
    textAlign: "center",
    color: "grey",
    height: "auto",
    marginBottom: "0px !important",
  },
  contact: {
    padding: "0px 20px 0px 20px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0px !important",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grow in>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={3} md={2} style={{ textAlign: "center" }}>
            <h1>Rojgar</h1>
          </Grid>
          <Grid container item className={classes.text} xs={12} sm={5} lg={6}>
            <Grid item xs={12}>
              <p>
                We believe anyone can achieve greatness if they are given the
                correct opportunities. We initiated Rojgar with the dream and
                vision to create these opportunities for the Nepali people.
                Nepal holds a sea of talent who are looking to work with people
                and organizations that recognize their merit. And we are all in
                to help our service seekers and service providers find their
                best match, from the comfort of your home!
              </p>
            </Grid>

            <Grid item xs={12} className="footer__text_link">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/about"
              >
                Know More
                <span>
                  <BsChevronRight />
                </span>
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            className={`footer__text_link ${classes.contact}`}
          >
            <h2 style={{ color: "goldenrod" }}>Contact Us</h2>
            <p>Rojgar</p>
            <p>+977-9867134091</p>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <p>http://localhost:3000</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"mailto: nabinstha246@gmail.com"}
            >
              <p>nabinstha246@gmail.com</p>
            </Link>
          </Grid>
        </Grid>
      </Grow>
      <p className={classes.p}>Copyright © 2021 Rojgar.com</p>
    </>
  );
};

export default Footer;
