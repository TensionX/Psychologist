const bcrypt = require('bcrypt');

const hashWithSalt = (password, saltNumber) => {
  const salt = bcrypt.genSaltSync(Number(saltNumber));
  return bcrypt.hashSync(password, salt);
};

const compare = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

module.exports = { hashWithSalt, compare };
