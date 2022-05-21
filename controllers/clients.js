const requests = require('./requests');
const PasswordHelper = require('../helpers/password');
const { HttpCode } = require('../helpers/constants');
const jwt = require('jsonwebtoken-refresh');

require('dotenv').config();

const getAllClients = async (req, res) => {
    const clients = await requests.getClients(req.user.id)
  
    return res.status(HttpCode.OK).json({
        clients
    });
};

const addClient = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await requests.getInfoByEmail(email);

    if (user) {
        return res.status(HttpCode.CONFLICT).json({
        success: false,
        message: 'User with this email already exist',
        });
    }
    
    const passwordHash = PasswordHelper.hashWithSalt(password, process.env.SALT_SECRET);

    const addUserResult = await requests.addClient({ email, password: passwordHash, firstName, lastName, creator: req.user.id });

    return res.status(HttpCode.OK).json({
        message: 'Successfully added',
        addUserResult
    });
};

const removeClient = async (req, res) => {
    await requests.removeClient(req.user.id, req.body.id)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully removed'
    });
};

module.exports = {
    getAllClients,
    addClient,
    removeClient
};
