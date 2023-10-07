const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user.model");
const appErrors = require("../utils/appErrors");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const generatJWT = require("../utils/generate.JWT");

const getAllUsers = asyncWrapper(async (req, res) => {
  console.log(req.headers);
  const query = req.query;
  console.log("query:", query);

  const limit = query.limit || 4;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appErrors.create(
      "User already exists!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename
  });

  //generate jwt token
  const token = await generatJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role
  });
  newUser.token = token;
  await newUser.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appErrors.create(
      "email and password are required!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appErrors.create(
      "User does not exist!",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    const error = appErrors.create(
      "Password is incorrect!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const token = await generatJWT({
    email: user.email,
    id: user._id,
    role: user.role
  });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user: "user logged in successfully.", token: token }
  });
});

module.exports = {
  getAllUsers,
  registerUser,
  loginUser
};

/**
  ///here is an example for token authentication
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  ==> first part is  { HEADER:ALGORITHM & TOKEN TYPE }
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.  ==> second part is  { PAYLOAD:DATA }
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ==> third part is  { VERIFY SIGNATURE }

HEADER:ALGORITHM & TOKEN TYPE 
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD:DATA
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

VERIFY SIGNATURE
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret 
) secret base64 encoded

 */
