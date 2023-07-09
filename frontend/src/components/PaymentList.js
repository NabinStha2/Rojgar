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
import { Link, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import Paginate from "./Paginate";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState();
  const [paymentPages, setPaymentPages] = useState(1);
  const params = useParams();
  // console.log(params);

  const fileHeaders = [
    { label: "ID", key: "_id" },
    { label: "E Email", key: "employerID.profile.email" },
    { label: "E KhaltiName", key: "employerID.bankAcc.khaltiName" },
    { label: "E KhaltiId", key: "employerID.bankAcc.khaltiId" },
    { label: "T Email", key: "talentID.profile.email" },
    { label: "T KhaltiName", key: "talentID.bankAcc.khaltiName" },
    { label: "T KhaltiId", key: "talentID.bankAcc.khaltiId" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "EPaidToAdmin", key: "isPaid" },
    { label: "Job Finished", key: "isFinished" },
    { label: "Payment Completed", key: "paymentComplete" },
    { label: "Post ID", key: "postID._id" },
    { label: "Post Title", key: "postID.title" },
  ];

  const completePaymentHandle = async ({ postID }) => {
    setLoading(true);
    const { data } = await axios.patch(
      "http://localhost:4000/paymentList/payByAdmin",
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
      `http://localhost:4000/paymentList/paymentDelete/${postID}`
    );
    setLoading(false);
    console.log(data);
    setPaymentList(data.paymentList);
  };

  const getPaymentList = useCallback(async (pageNumber) => {
    setLoading(true);
    console.log("fetch all");
    // console.log(pageNumber);
    const { data } = await axios.get(
      `http://localhost:4000/paymentList/${pageNumber}`
    );
    setLoading(false);
    // console.log(data.paymentList);
    setPaymentPages(data.pages);
    setPaymentList(data.paymentList);
  }, []);

  const getAllPaymentList = useCallback(async (pageNumber) => {
    const { data } = await axios.get("http://localhost:4000/paymentList");
    // console.log(data.paymentList);
    setFileData(data.paymentList);
  }, []);

  useEffect(() => {
    getAllPaymentList();
    getPaymentList(params.pageNumber);
  }, [getPaymentList, params.pageNumber]);

  return (
    <Container maxWidth="lg">
      <>
        {fileData?.length && (
          <CSVLink
            headers={fileHeaders}
            data={fileData}
            filename="payments.csv"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              disabled={!fileData}
              variant="outlined"
              sx={{ margin: "5px" }}
            >
              Export
            </Button>
          </CSVLink>
        )}
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
            <>
              <Paginate
                pageNumber={params.pageNumber}
                payment={true}
                paymentPages={paymentPages}
              />
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
                })}
              </List>
            </>
          )
        )}
      </>
    </Container>
  );
};

export default PaymentList;
