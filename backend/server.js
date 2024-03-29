const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const colors = require("colors");
const app = express();
const axios = require("axios");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const talentRoutes = require("./routes/talentRoutes");
const employerRoutes = require("./routes/employerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const Post = require("./models/postModel");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
var cookieParser = require("cookie-parser");

var compression = require("compression");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "5000mb" }));
app.use(express.urlencoded({ extended: true, limit: "5000mb" }));
app.use(
  compression({
    level: 1,
    threshold: 0,
  })
);

connectDB();

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/talent", talentRoutes);
app.use("/employer", employerRoutes);
app.use("/paymentList", paymentRoutes);
// app.use("/api/upload", uploadRoutes);

// app.use(express.static("/uploads"));

app.get("/payment/:token/:amt/:key", async (req, res) => {
  console.log(`${req.params.token} ${req.params.amt} ${req.params.key}`);
  let data = {
    token: req.params.token,
    amount: req.params.amt,
  };

  let config = {
    headers: {
      Authorization: `Key ${req.params.key}`,
    },
  };

  await axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(async (response) => {
      console.log(response.data);
      // await Post.findByIdAndUpdate(
      //   { _id: req.params.postId },
      //   { isPaid: true },
      //   { new: true }
      // );
      res.json({ success: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!!!`.yellow
      .bold
  );
});
