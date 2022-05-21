const requests = require('./requests');
const PasswordHelper = require('../helpers/password');
const { HttpCode } = require('../helpers/constants');
const jwt = require('jsonwebtoken-refresh');

require('dotenv').config();

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const user = await requests.getInfoByEmail(email);

  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      success: false,
      message: 'User with this email already exist',
    });
  }
  
  const passwordHash = PasswordHelper.hashWithSalt(password, process.env.SALT_SECRET);

  const addUserResult = await requests.addClient({ email, password: passwordHash, firstName, lastName });

  return res.status(HttpCode.OK).json({
    message: 'Successfully registered',
    addUserResult
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await requests.getInfoByEmail(email);

  if (!user) {
    console.log("t")
    return res.status(HttpCode.NOT_FOUND).json({
      success: false,
      message: 'User doesn`t exist',
    });
  }

  const verifyPassword = await PasswordHelper.compare(password, user.PasswordHash);

  if (!verifyPassword) {
    return res.status(HttpCode.BAD_REQUEST).json({
      success: false,
      message: 'Password incorrect',
    });
  }

  const token = jwt.sign({ ...user }, process.env.SALT_SECRET, {
    expiresIn: '7 days',
  });

  req.session.token = token;

  return res.status(HttpCode.OK).json({
    user,
    token,
  });
};

const checkSession = async (req, res) => {
  const tokenSession = req.session.token;
  if (!tokenSession) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      message: "Session doesn't exist",
    });
  }

  jwt.verify(tokenSession, process.env.JWT_SECRET );
  const originalDecoded = jwt.decode(tokenSession, { complete: true });
  const refreshed = jwt.refresh(originalDecoded, "7d", process.env.JWT_SECRET );
  req.session.token = refreshed;
  console.log(originalDecoded)

  return res.status(HttpCode.OK).json({
    user: originalDecoded.payload,
    token: req.session.token,
  });
};

const logout = async (req, res) => {
  req.session.token = null;

  return res.status(HttpCode.OK).json({
    user: originalDecoded.payload,
    token: req.session.token,
  });
};

module.exports = {
    signup,
    signin,
    logout,
    checkSession
};
