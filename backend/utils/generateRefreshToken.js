const jwt = require("jsonwebtoken");
const generateRefreshToken = ({ id }) => {
  return jwt.sign(
    { id: id },
    // { id: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "30d",
      noTimestamp: false,
    }
  );
};

module.exports = generateRefreshToken;
