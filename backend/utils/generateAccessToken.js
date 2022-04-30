const jwt = require("jsonwebtoken");

const generateAccessToken = ({ id }) => {
  console.log(id);
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "20m",
    noTimestamp: false,
  });
};

module.exports = generateAccessToken;
