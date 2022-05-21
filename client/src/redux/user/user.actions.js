import { createAction } from "@reduxjs/toolkit";

const signUpRequest = createAction("Auth/signUpRequest");
const signUpSuccess = createAction("Auth/signUpSuccess");
const signUpError = createAction("Auth/signUpError");

const signInRequest = createAction("Auth/signInRequest");
const signInSuccess = createAction("Auth/signInSuccess");
const signInError = createAction("Auth/signInError");

const logoutRequest = createAction("Auth/logoutRequest");

const refreshSessionRequest = createAction("User/refreshSessionRequest");
const refreshSessionSuccess = createAction("User/refreshSessionSecces");
const refreshSessionError = createAction("User/refreshSessionError");

const getClientsRequest = createAction("User/getClientsRequest");
const getClientsSuccess = createAction("User/getClientsSecces");
const getClientsError = createAction("User/getClientsError");

const removeClientRequest = createAction("User/removeClientRequest");
const removeClientSuccess = createAction("User/removeClientSecces");
const removeClientError = createAction("User/removeClientError");

const addClientRequest = createAction("User/addClientRequest");
const addClientSuccess = createAction("User/addClientSecces");
const addClientError = createAction("User/addClientError");

const addTestRequest = createAction("User/addTestRequest");
const addTestSuccess = createAction("User/addTestSecces");
const addTestError = createAction("User/addTestError");

const editTestRequest = createAction("User/editTestRequest");
const editTestSuccess = createAction("User/editTestSecces");
const editTestError = createAction("User/editTestError");

const removeTestRequest = createAction("User/removeTestRequest");
const removeTestSuccess = createAction("User/removeTestSecces");
const removeTestError = createAction("User/removeTestError");

const getTestsRequest = createAction("User/getTestsRequest");
const getTestsSuccess = createAction("User/getTestsSecces");
const getTestsError = createAction("User/getTestsError");

const assignTestRequest = createAction("User/assignTestRequest");
const assignTestSuccess = createAction("User/assignTestSecces");
const assignTestError = createAction("User/assignTestError");

const getActiveTestRequest = createAction("User/getActiveTestRequest");
const getActiveTestSuccess = createAction("User/getActiveTestSecces");
const getActiveTestError = createAction("User/getActiveTestError");

const answerActiveTestRequest = createAction("User/answerActiveTestRequest");
const answerActiveTestSuccess = createAction("User/answerActiveTestSecces");
const answerActiveTestError = createAction("User/answerActiveTestError");

const clientTestsRequest = createAction("User/clientTestsRequest");
const clientTestsSuccess = createAction("User/clientTestsSecces");
const clientTestsError = createAction("User/clientTestsError");

const clientTestCommentRequest = createAction("User/clientTestCommentRequest");
const clientTestCommentSuccess = createAction("User/clientTestCommentSecces");
const clientTestCommentError = createAction("User/clientTestCommentError");

const resetError = createAction("Auth/resetError");

export {
  signUpRequest,
  signUpSuccess,
  signUpError,
  signInRequest,
  signInSuccess,
  signInError,
  logoutRequest,
  refreshSessionRequest,
  refreshSessionSuccess,
  refreshSessionError,
  getClientsRequest,
  getClientsSuccess,
  getClientsError,
  removeClientRequest,
  removeClientSuccess,
  removeClientError,
  addClientRequest,
  addClientSuccess,
  addClientError,
  addTestRequest,
  addTestSuccess,
  addTestError,
  editTestRequest,
  editTestSuccess,
  editTestError,
  removeTestRequest,
  removeTestSuccess,
  removeTestError,
  getTestsRequest,
  getTestsSuccess,
  getTestsError,
  assignTestRequest,
  assignTestSuccess,
  assignTestError,
  getActiveTestRequest,
  getActiveTestSuccess,
  getActiveTestError,
  answerActiveTestRequest,
  answerActiveTestSuccess,
  answerActiveTestError,
  clientTestsRequest,
  clientTestsSuccess,
  clientTestsError,
  clientTestCommentRequest,
  clientTestCommentSuccess,
  clientTestCommentError,
  resetError,
};
