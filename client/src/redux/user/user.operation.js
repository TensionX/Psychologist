import {
  signin, 
  signup,
  logout,
  refreshSession,
  getClients,
  addClient,
  removeClient,
  addTest,
  editTest,
  removeTest,
  getTests,
  assignTest,
  getActiveTest,
  answerActiveTest,
  clientTests,
  clientTestComment
} from "../../services/api";
import {
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
} from "./user.actions";
import { toast } from 'react-toastify'

const errorHandler = (status, dispatch) => {
  if(status === 401){
    dispatch(logoutRequest())
  }
};

export const signUpOperation =
  ({ email, password, firstName, lastName }) =>
  (dispatch) => {
    dispatch(signUpRequest());
    signup({ email, password, firstName, lastName })
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(signUpError(result.data.message));
        } else {
          dispatch(signUpSuccess());
        }
      })
      .catch((error) => {
        dispatch(signUpError(error.message));
      });
};

export const signInOperation =
  ({ email, password }) =>
  (dispatch) => {
    dispatch(signInRequest());
    signin({ email, password })
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(signInError(result.data.message));
        } else {
          dispatch(signInSuccess(result.data));
        }
      })
      .catch((error) => {
        dispatch(signInError(error.message));
      });
};

export const logoutOperation = () => (dispatch) => {
  logout()
    .then((result) => {
      dispatch(logoutRequest());
    })
    .catch((error) => {
      console.log(error)
    });
};

export const refreshSessionOperation = () => (dispatch) => {
  dispatch(refreshSessionRequest());
  refreshSession()
    .then((result) => {
      if (result.status !== 200) {
        errorHandler(result.status, dispatch)
        dispatch(signInError(result.data.message));
      } else {
        dispatch(refreshSessionSuccess(result.data));
        dispatch(signInSuccess(result.data));
      }
    })
    .catch((error) => {
      dispatch(refreshSessionError(error.message));
    });
};

export const getClientsOperation = () =>
  (dispatch) => {
    dispatch(getClientsRequest());
    getClients()
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(getClientsError(result.data.message));
        } else {
          dispatch(getClientsSuccess(result.data.clients));
        }
      })
      .catch((error) => {
        dispatch(getClientsError(error.message));
      });
};

export const addClientOperation = (data) =>
  (dispatch) => {
    dispatch(addClientRequest());
    addClient(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(addClientError(result.data.message));
        } else {
          dispatch(addClientSuccess(result.data.clients));
          dispatch(getClientsOperation())
        }
      })
      .catch((error) => {
        dispatch(addClientError(error.message));
      });
};

export const removeClientOperation = (id) =>
  (dispatch) => {
    dispatch(removeClientRequest());
    removeClient({id})
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(removeClientError(result.data.message));
        } else {
          dispatch(removeClientSuccess(result.data.clients));
          dispatch(getClientsOperation())
        }
      })
      .catch((error) => {
        dispatch(removeClientError(error.message));
      });
};

export const getTestsOperation = () =>
  (dispatch) => {
    dispatch(getTestsRequest());
    getTests()
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(getTestsError(result.data.message));
        } else {
          dispatch(getTestsSuccess(result.data.clients));
          dispatch(getClientsOperation())
        }
      })
      .catch((error) => {
        dispatch(getTestsError(error.message));
      });
};

export const addTestOperation = (data) =>
  (dispatch) => {
    dispatch(addTestRequest());
    addTest(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(addTestError(result.data.message));
        } else {
          dispatch(addTestSuccess(result.data.clients));
          dispatch(getTestsOperation())
        }
      })
      .catch((error) => {
        dispatch(addTestError(error.message));
      });
};

export const editTestOperation = (data) =>
  (dispatch) => {
    dispatch(editTestRequest());
    editTest(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(editTestError(result.data.message));
        } else {
          dispatch(editTestSuccess(result.data.clients));
          dispatch(getTestsOperation())
        }
      })
      .catch((error) => {
        dispatch(editTestError(error.message));
      });
};

export const removeTestOperation = (id) =>
  (dispatch) => {
    dispatch(removeTestRequest());
    removeTest({id})
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(removeTestError(result.data.message));
        } else {
          dispatch(removeTestSuccess(result.data.clients));
          dispatch(getTestsOperation())
        }
      })
      .catch((error) => {
        dispatch(removeTestError(error.message));
      });
};

export const assignTestOperation = (data) =>
  (dispatch) => {
    dispatch(assignTestRequest());
    assignTest(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(assignTestError(result.data.message));
        } else {
          dispatch(assignTestSuccess(result.data.clients));
          dispatch(getTestsOperation())
        }
      })
      .catch((error) => {
        dispatch(assignTestError(error.message));
      });
};

export const getActiveTestOperation = (data) =>
  (dispatch) => {
    dispatch(getActiveTestRequest());
    getActiveTest(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(getActiveTestError(result.data.message));
        } else {
          dispatch(getActiveTestSuccess(result.data.test));
        }
      })
      .catch((error) => {
        dispatch(getActiveTestError(error.message));
      });
};

export const answerActiveTestOperation = (data) =>
  (dispatch) => {
    dispatch(answerActiveTestRequest());
    answerActiveTest(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(answerActiveTestError(result.data.message));
        } else {
          dispatch(answerActiveTestSuccess(result.data.test));
        }
      })
      .catch((error) => {
        dispatch(answerActiveTestError(error.message));
      });
};

export const clientTestsOperation = (data) =>
  (dispatch) => {
    dispatch(clientTestsRequest());
    clientTests(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(clientTestsError(result.data.message));
        } else {
          dispatch(clientTestsSuccess(result.data.tests));
        }
      })
      .catch((error) => {
        dispatch(clientTestsError(error.message));
      });
};

export const clientTestCommentOperation = (data) =>
  (dispatch) => {
    dispatch(clientTestCommentRequest());
    clientTestComment(data)
      .then((result) => {
        if (result.status !== 200) {
          errorHandler(result.status, dispatch)
          dispatch(clientTestCommentError(result.data.message));
        } else {
          dispatch(clientTestCommentSuccess(result.data.tests));
          dispatch(clientTestsOperation)
        }
      })
      .catch((error) => {
        dispatch(clientTestCommentError(error.message));
      });
};