const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnauthenticatedError("Please login");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job route
    req.user = {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

module.exports = auth;
