const jwt = require("jsonwebtoken");

const generateToken = ({ id }) => {
  console.log(id);
  return jwt.sign({ id: id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "30d",
    noTimestamp: false,
  });
};

module.exports = generateToken;
