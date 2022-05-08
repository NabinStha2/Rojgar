import {
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Paper,
  Container,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const completePaymentHandle = async ({ postID }) => {
    setLoading(true);
    const { data } = await axios.patch(
      "http://localhost:5000/paymentList/payByAdmin",
      {
        postID: postID,
      }
    );
    setLoading(false);
    // console.log(data);
    setPaymentList(data.paymentList);
  };

  const deletePaymentHandle = async ({ postID }) => {
    setLoading(true);
    const { data } = await axios.delete(
      `http://localhost:5000/paymentList/paymentDelete/${postID}`
    );
    setLoading(false);
    console.log(data);
    setPaymentList(data.paymentList);
  };

  const getPaymentList = useCallback(async () => {
    setLoading(true);
    console.log("fetch all");
    const { data } = await axios.get("http://localhost:5000/paymentList");
    setLoading(false);
    setPaymentList(data.paymentList);
  }, []);

  useEffect(() => {
    getPaymentList();
  }, [getPaymentList]);

  return (
    <Container maxWidth="lg">
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
        paymentList &&
        paymentList.length > 0 && (
          <List>
            {paymentList.map((payment, index) => {
              return (
                <Paper elevation={2} sx={{ margin: "10px 0px" }}>
                  <ListItem
                    key={index}
                    sx={{
                      // backgroundColor: "#ADD8E6",
                      "&:hover": {
                        backgroundColor: "#D3D3D3",
                      },
                    }}
                    divider
                    disablePadding
                  >
                    <Link
                      to={`/project/${payment.postID._id}`}
                      style={{
                        textDecoration: "none",
                        flex: 1,
                        color: "black",
                      }}
                    >
                      <ListItemButton>
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <Grid
                            item
                            container
                            xs={12}
                            sm={8}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                            }}
                          >
                            <Grid item>
                              <Typography variant="h6" gutterBottom>
                                {payment.postID.title}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" gutterBottom>
                                Rs. {payment.amount}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" gutterBottom>
                                Paid:{" "}
                                {payment.isPaid === true ? (
                                  <CheckIcon sx={{ color: "green" }} />
                                ) : (
                                  <CloseIcon sx={{ color: "red" }} />
                                )}
                                <br />
                                Finished:{" "}
                                {payment.isFinished === true ? (
                                  <CheckIcon sx={{ color: "green" }} />
                                ) : (
                                  <CloseIcon sx={{ color: "red" }} />
                                )}
                                <br />
                                paymentCompleted:{" "}
                                {payment.paymentComplete === true ? (
                                  <CheckIcon sx={{ color: "green" }} />
                                ) : (
                                  <CloseIcon sx={{ color: "red" }} />
                                )}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              onClick={() =>
                                completePaymentHandle({
                                  postID: payment.postID._id,
                                })
                              }
                              disabled={
                                payment.paymentComplete === true ||
                                payment.isFinished === false
                              }
                              variant="outlined"
                              sx={{ margin: "5px" }}
                            >
                              Pay
                            </Button>
                            <Button
                              onClick={() =>
                                deletePaymentHandle({
                                  postID: payment.postID._id,
                                })
                              }
                              variant="outlined"
                              color="warning"
                              sx={{ margin: "5px" }}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </Paper>
              );
            })}{" "}
          </List>
        )
      )}
    </Container>
  );
};

export default PaymentList;
