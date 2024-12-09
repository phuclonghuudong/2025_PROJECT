const jwt = require("jsonwebtoken");

const getAccessToken = async ({ _id, email, rule }) => {
  const payload = { _id, email, rule };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = { getAccessToken };
