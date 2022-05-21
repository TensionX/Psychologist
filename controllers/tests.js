const requests = require('./requests');
const PasswordHelper = require('../helpers/password');
const { HttpCode } = require('../helpers/constants');
const jwt = require('jsonwebtoken-refresh');

require('dotenv').config();

const getAllTests = async (req, res) => {
    const creator = req.user.Creator
    const clients = await requests.getTests(req.user.id, creator)
  
    return res.status(HttpCode.OK).json({
        clients
    });
};

const getActiveTest = async (req, res) => {
    const id = req.body.id
    const test = await requests.getActiveTest(id)
  
    return res.status(HttpCode.OK).json({
        test
    });
};

const addTest = async (req, res) => {
    const { questions, name } = req.body;

    const addUserResult = await requests.addTest({ name, questions, creator: req.user.id });

    return res.status(HttpCode.OK).json({
        message: 'Successfully added',
        addUserResult
    });
};

const editTest = async (req, res) => {
    const { questions, name, id } = req.body;

    const addUserResult = await requests.editTest({ id, name, questions, creator: req.user.id });

    return res.status(HttpCode.OK).json({
        message: 'Successfully edited',
        addUserResult
    });
};

const removeTest = async (req, res) => {
    await requests.removeTest(req.user.id, req.body.id)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully removed'
    });
};

const assignTest = async (req, res) => {
    await requests.assignTest(req.body.testId, req.body.clientId)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully assigned'
    });
};

const answerActiveTest = async (req, res) => {
    const userId = req.user.id
    await requests.answerActiveTest(userId, req.body.creatorId, req.body.testId, req.body.answers)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully assigned'
    });
};

const clientTests = async (req, res) => {
    const userId = req.body.id
    const result = await requests.clientTests(userId)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully assigned',
        tests: result
    });
};

const clientTestComment = async (req, res) => {
    const {assignId, comment} = req.body
    const result = await requests.clientTestComment(assignId, comment)
  
    return res.status(HttpCode.OK).json({
        message: 'Successfully assigned',
        tests: result
    });
};

module.exports = {
    getAllTests,
    addTest,
    editTest,
    removeTest,
    assignTest,
    getActiveTest,
    answerActiveTest,
    clientTests,
    clientTestComment
};
